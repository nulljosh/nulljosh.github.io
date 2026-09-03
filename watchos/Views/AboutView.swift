import SwiftUI

/// The bio header + contact footer from the iOS `ContentView`'s `List`, the two parts of
/// that screen that are about Joshua rather than a project list.
struct AboutView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 8) {
                Text(PortfolioData.name)
                    .font(.headline)
                Text(PortfolioData.location)
                    .font(.caption2)
                    .foregroundStyle(.secondary)

                Divider().padding(.vertical, 2)

                Text(PortfolioData.bio)
                    .font(.caption2)
                    .foregroundStyle(.secondary)

                Divider().padding(.vertical, 2)

                Text(PortfolioData.email)
                    .font(.caption2)
                Text(PortfolioData.phone)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 4)
        }
    }
}
