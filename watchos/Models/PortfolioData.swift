import Foundation

/// The portfolio site has no backend and no JSON data file -- `index.html`'s work list
/// and `ios/Sources/PortfolioApp.swift`'s `work` array are both hand-maintained literals
/// (see that file's "ponytail: content hardcoded to mirror index.html" comment). There is
/// nothing to fetch and no pairing step that would make sense for a static bio page, so
/// this is a full local port: the same work list, copied as a Swift literal the same way
/// the iOS app copies it, kept in sync by hand like the two existing copies already are.
struct WorkItem: Identifiable {
    var id: String { name }
    let name: String
    let meta: String
}

enum PortfolioData {
    static let work: [WorkItem] = [
        WorkItem(name: "Epiphany", meta: "Web · iOS · macOS · watchOS"),
        WorkItem(name: "Talli", meta: "Web · iOS · watchOS"),
        WorkItem(name: "Voxprint", meta: "Web · iOS · macOS"),
        WorkItem(name: "Sparkjar", meta: "Web · iOS · macOS · watchOS"),
        WorkItem(name: "Healstack", meta: "Web · iOS"),
        WorkItem(name: "Lexly", meta: "Web · iOS · macOS"),
        WorkItem(name: "Litigate", meta: "Web · iOS · macOS"),
        WorkItem(name: "Quotable", meta: "Web · iOS"),
        WorkItem(name: "NYC", meta: "iOS · macOS"),
        WorkItem(name: "Wiretext", meta: "Web · iOS · macOS"),
        WorkItem(name: "Curvely", meta: "Web · iOS · macOS"),
        WorkItem(name: "Nimble", meta: "macOS"),
    ]

    static let name = "Joshua Trommel"
    static let location = "Langley, BC"
    static let bio = "Software engineer building financial tools, health trackers, and native Mac apps."
    static let email = "jatrommel@gmail.com"
    static let phone = "778-201-4533"
}
