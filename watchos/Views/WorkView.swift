import SwiftUI

/// The `#work` list from `index.html` / the iOS app's `work` array, trimmed to the two
/// fields that fit a watch face: project name and shipped platforms. Ranked most- to
/// least-shipped, same order as the source (see nulljosh.github.io/CLAUDE.md).
struct WorkView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 8) {
                Text("Work")
                    .font(.headline)
                Text("\(PortfolioData.work.count) projects shipped")
                    .font(.caption2)
                    .foregroundStyle(.secondary)

                Divider().padding(.vertical, 2)

                ForEach(PortfolioData.work) { item in
                    VStack(alignment: .leading, spacing: 1) {
                        Text(item.name)
                            .font(.caption.weight(.medium))
                        Text(item.meta)
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 3)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 4)
        }
    }
}
