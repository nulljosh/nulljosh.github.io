import SwiftUI

// Sage theme — mirrors tokens-sage.css (light #fdfdfc/#111, dark #111/#ededed)
enum Theme {
    static let bg = Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(white: 0.067, alpha: 1) : UIColor(red: 0.992, green: 0.992, blue: 0.988, alpha: 1) })
    static let text = Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(white: 0.93, alpha: 1) : UIColor(white: 0.067, alpha: 1) })
    static let secondary = Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(white: 1, alpha: 0.45) : UIColor(white: 0, alpha: 0.4) })
    static let hairline = Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(white: 0.122, alpha: 1) : UIColor(white: 0.949, alpha: 1) })
}

struct Item: Identifiable {
    let id = UUID()
    let year: String
    let name: String
    let meta: String
    var url: String? = nil
}

// ponytail: content hardcoded to mirror index.html; fetch from site if it drifts
let work = [
    Item(year: "2025", name: "Epiphany — finance dashboard", meta: "Web · iOS · macOS · watchOS", url: "https://epiphany.heyitsmejosh.com"),
    Item(year: "", name: "Talli — benefits tracker", meta: "Web · iOS · watchOS", url: "https://talli.heyitsmejosh.com"),
    Item(year: "", name: "Echo — on-device transcription", meta: "Web · iOS · macOS", url: "https://echo.heyitsmejosh.com"),
    Item(year: "", name: "Spark — idea forum", meta: "Web · iOS · macOS · watchOS", url: "https://spark.heyitsmejosh.com"),
    Item(year: "", name: "Healstack — health dashboard", meta: "Web · iOS", url: "https://healstack.heyitsmejosh.com"),
    Item(year: "2026", name: "Lexly — language learning", meta: "Web · iOS · macOS", url: "https://lexly.heyitsmejosh.com"),
    Item(year: "", name: "Casewright — litigation planner", meta: "Web · iOS · macOS", url: "https://brief.heyitsmejosh.com"),
    Item(year: "", name: "Quotable — movie-quote trivia", meta: "Web · iOS", url: "https://quotable.heyitsmejosh.com"),
    Item(year: "", name: "NYC — Times Square city sim", meta: "iOS · macOS", url: "https://nyc.heyitsmejosh.com"),
    Item(year: "", name: "Wiretext — wireframe text editor", meta: "Web · iOS · macOS", url: "https://wiretext.heyitsmejosh.com"),
    Item(year: "", name: "Grapher — graph visualization", meta: "Web · iOS · macOS", url: "https://grapher.heyitsmejosh.com"),
    Item(year: "", name: "Nimble — instant-answer search", meta: "macOS", url: "https://nimble.heyitsmejosh.com"),
]

let experience = [
    Item(year: "2024", name: "Independent software developer", meta: "2024 – present"),
    Item(year: "2020", name: "Customer service & inventory — Best Choice Garage Doors", meta: "2020 – 2026"),
    Item(year: "2018", name: "Mac specialist — Simply Computing", meta: "2018 – 2019"),
    Item(year: "2017", name: "Mobile consultant — Macinhome", meta: "2017 – 2018"),
]

let education = [
    Item(year: "2026", name: "University of Victoria — BSc Computer Science", meta: "returning"),
    Item(year: "", name: "BCIT — A+ hardware certification coursework", meta: ""),
]

let writing = [
    Item(year: "2026", name: "Renames and Widgets", meta: "Jul 3", url: "https://journal.heyitsmejosh.com/2026/07/03/june-july/"),
    Item(year: "", name: "Fold", meta: "May 29", url: "https://journal.heyitsmejosh.com/2026/05/29/may/"),
    Item(year: "", name: "Everything Connected", meta: "Apr 26", url: "https://journal.heyitsmejosh.com/2026/04/26/april/"),
    Item(year: "", name: "Boot to Prompt", meta: "Feb 20", url: "https://journal.heyitsmejosh.com/2026/02/20/week/"),
]

struct SectionList: View {
    let title: String
    let items: [Item]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(title)
                .foregroundStyle(Theme.secondary)
                .padding(.bottom, 8)
            Rectangle().fill(Theme.hairline).frame(height: 1)
            ForEach(Array(items.enumerated()), id: \.element.id) { i, item in
                row(item)
                if i < items.count - 1 {
                    Rectangle().fill(Theme.hairline).frame(height: 1)
                }
            }
        }
        .padding(.top, 40)
    }

    @ViewBuilder
    func row(_ item: Item) -> some View {
        let content = HStack(alignment: .firstTextBaseline, spacing: 8) {
            Text(item.year)
                .foregroundStyle(Theme.secondary)
                .frame(width: 44, alignment: .leading)
            Text(item.name)
                .foregroundStyle(Theme.text)
                .multilineTextAlignment(.leading)
            Spacer(minLength: 8)
            Text(item.meta)
                .foregroundStyle(Theme.secondary)
                .lineLimit(1)
        }
        .padding(.vertical, 11)

        if let url = item.url.flatMap(URL.init) {
            Link(destination: url) { content }
        } else {
            content
        }
    }
}

struct ContentView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Text("Joshua Trommel")
                Text("Langley, BC").foregroundStyle(Theme.secondary).padding(.top, 2)

                VStack(alignment: .leading, spacing: 18) {
                    Text("I'm a software engineer building financial tools, health trackers, and native Mac apps.")
                    Text("I ship independent apps for web, iOS, macOS, and watchOS — everything below is live, most of it on the App Store.")
                    Text("Previously an Apple specialist at Macinhome and Simply Computing in Vancouver. Returning to the University of Victoria for computer science.")
                }
                .padding(.top, 36)

                SectionList(title: "Work", items: work)
                SectionList(title: "Experience", items: experience)
                SectionList(title: "Education", items: education)
                SectionList(title: "Writing", items: writing)

                Text("jatrommel@gmail.com · 778-201-4533 · © 2026")
                    .foregroundStyle(Theme.secondary)
                    .padding(.top, 56)
            }
            .font(.system(size: 14))
            .foregroundStyle(Theme.text)
            .padding(.horizontal, 20)
            .padding(.top, 60)
            .padding(.bottom, 80)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(Theme.bg.ignoresSafeArea())
    }
}

@main
struct PortfolioApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
    }
}
