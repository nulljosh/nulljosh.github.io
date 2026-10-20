#!/usr/bin/env python3
"""Sync the #apps list in index.html with GitHub. Run before deploying: python3 scripts/sync-projects.py [--dry]

Sources are nulljosh's public repos plus the folders of the labs monorepo. Each row is keyed to its
source, so a renamed subdomain can never add a second row. Rows whose source is archived, gone, or
quiet for STALE_DAYS are dropped, unless the app is on the App Store. Public repos with a jaybulb.com
homepage that the list doesn't have yet are added. Curated names, blurbs and prices are left alone."""
import datetime, html, json, re, subprocess, sys

STALE_DAYS = 120
SKIP = {'nulljosh.github.io', 'homebrew-tap', 'labs', 'dotfiles', 'scripts', 'runs', 'launch', 'journal', '.github'}
# live projects with no GitHub remote yet (see ~/Documents/Code/CLAUDE.md); drop one once it gets a repo
LOCAL = {'noema', 'gato'}
# subdomain -> source, where they differ
ALIAS = {'plain': 'plaintxt'}
FOLD = re.compile(r'^(Fold |Point links|Move |Merge )')  # monorepo bookkeeping, not real work

def gh(*args):
    return json.loads(subprocess.run(['gh', 'api', *args], capture_output=True, text=True, check=True).stdout)

def sources():
    out = {}
    for r in gh('user/repos?per_page=100&affiliation=owner&visibility=all'):
        if r['fork']: continue
        sub = re.search(r'//([a-z0-9-]+)\.jaybulb\.com', r['homepage'] or '')
        out[r['name']] = {'date': r['pushed_at'][:10], 'archived': r['archived'],
                          'home': f'https://{sub.group(1)}.jaybulb.com' if sub else None, 'about': r['description'] or '',
                          'private': r['private']}
    for n in LOCAL:
        out[n] = {'date': None, 'archived': False, 'home': f'https://{n}.jaybulb.com', 'about': '', 'private': True}
    for d in gh('repos/nulljosh/labs/contents'):
        if d['type'] != 'dir' or d['name'] in SKIP: continue
        date = None
        for c in gh(f'repos/nulljosh/labs/commits?path={d["name"]}&per_page=20'):
            if not FOLD.match(c['commit']['message']):
                date = c['commit']['committer']['date'][:10]; break
            if len(c['parents']) > 1:  # folded with history kept: the second parent is the old repo
                date = gh(f'repos/nulljosh/labs/commits/{c["parents"][1]["sha"]}')['commit']['committer']['date'][:10]; break
        out.setdefault(d['name'], {'date': date, 'archived': False, 'home': f'https://{d["name"]}.jaybulb.com', 'about': '', 'private': False})
    return out

def key(href, src):
    m = re.search(r'//([a-z0-9-]+)\.jaybulb\.com', href) or re.search(r'github\.com/nulljosh/([^/"]+)', href)
    sub = m.group(1) if m else ''
    sub = ALIAS.get(sub, sub)
    if sub in src: return sub
    return next((n for n, s in src.items() if s['home'] == href.rstrip('/')), None)

def main(dry):
    page = open('index.html').read()
    a = page.index('<ul>', page.index('id="apps"')) + 4; b = page.index('</ul>', a)
    rows = re.findall(r'<li>.*?</li>', page[a:b])
    src, today, kept, seen, log = sources(), datetime.date.today(), [], set(), []
    for li in rows:
        href = re.search(r'class="who"><a href="([^"]+)"', li).group(1)
        name = re.search(r'">([^<]+)</a><span>', li).group(1)
        store = 'apps.apple.com' in li
        k = key(href, src)
        if k and k in seen: log.append(f'- {name}: duplicate of {k}'); continue
        s = src.get(k) if k else None
        if k: seen.add(k)
        if not s and not store: log.append(f'- {name}: no repo or labs folder'); continue
        if s and not store:
            if s['archived']: log.append(f'- {name}: archived'); continue
            if s['date'] and (today - datetime.date.fromisoformat(s['date'])).days > STALE_DAYS:
                log.append(f'- {name}: quiet since {s["date"]}'); continue
        kept.append(li)
    for n, s in sorted(src.items()):
        if n in seen or not s['home'] or s['archived'] or s['private'] or not s['about']: continue
        if s['date'] and (today - datetime.date.fromisoformat(s['date'])).days > STALE_DAYS: continue
        title = n[:1].upper() + n[1:]
        about = html.escape(s['about'].split('. ')[0].rstrip('.'))
        kept.insert(len(kept) - 1, f'<li><div class="who"><a href="{s["home"]}">{title}</a><span>{about}</span></div>'
                    f'<span class="price">On the web</span><a class="button" href="{s["home"]}">Open</a></li>')
        log.append(f'+ {title}: new repo')
    print('\n'.join(log) or 'in sync', f'\n{len(kept)} rows')
    if not dry:
        open('index.html', 'w').write(page[:a] + '\n' + '\n'.join(kept) + '\n' + page[b:])

if __name__ == '__main__':
    main('--dry' in sys.argv)
