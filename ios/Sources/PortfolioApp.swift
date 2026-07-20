import SwiftUI

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
    Item(year: "", name: "Litigate — litigation planner", meta: "Web · iOS · macOS", url: "https://litigate.heyitsmejosh.com"),
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

struct ItemRow: View {
    let item: Item

    var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: 10) {
            if !item.year.isEmpty {
                Text(item.year)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .frame(width: 36, alignment: .leading)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text(item.name)
                    .font(.body)
                Text(item.meta)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            if item.url != nil {
                Spacer()
                Image(systemName: "arrow.up.right")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
            }
        }
        .padding(.vertical, 4)
    }
}

struct ContentView: View {
    @Environment(\.openURL) private var openURL

    var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Joshua Trommel")
                            .font(.title2.bold())
                        Text("Langley, BC")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                        Text("Software engineer building financial tools, health trackers, and native Mac apps. Shipping independent apps for web, iOS, macOS, and watchOS — everything below is live, most of it on the App Store.")
                            .font(.callout)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 8)
                }

                section("Work", work)
                section("Experience", experience)
                section("Education", education)
                section("Writing", writing)

                Section {
                    Text("jatrommel@gmail.com · 778-201-4533")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Portfolio")
            .navigationBarTitleDisplayMode(.large)
        }
    }

    @ViewBuilder
    private func section(_ title: String, _ items: [Item]) -> some View {
        Section(title) {
            ForEach(items) { item in
                if let urlString = item.url, let url = URL(string: urlString) {
                    Button {
                        openURL(url)
                    } label: {
                        ItemRow(item: item)
                    }
                    .tint(.primary)
                } else {
                    ItemRow(item: item)
                }
            }
        }
    }
}

@main
struct PortfolioApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
    }
}
