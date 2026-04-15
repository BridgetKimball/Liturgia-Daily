import WidgetKit
import SwiftUI

// ── Data model ────────────────────────────────────────────────────────────────

struct LiturgiaEntry: TimelineEntry {
    let date: Date
    let season: String
    let color: String
    let colorHex: String
}

// ── Timeline provider ─────────────────────────────────────────────────────────

struct LiturgiaProvider: TimelineProvider {

    func placeholder(in context: Context) -> LiturgiaEntry {
        LiturgiaEntry(date: Date(), season: "Ordinary Time", color: "Green", colorHex: "#4A7C59")
    }

    func getSnapshot(in context: Context, completion: @escaping (LiturgiaEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<LiturgiaEntry>) -> Void) {
        let entry = loadEntry()
        // Refresh at the start of the next calendar day
        let tomorrow = Calendar.current.startOfDay(for: Date().addingTimeInterval(86_400))
        completion(Timeline(entries: [entry], policy: .after(tomorrow)))
    }

    /// Reads the liturgical data written by the main app via AsyncStorage /
    /// UserDefaults using the shared App Group suite.
    private func loadEntry() -> LiturgiaEntry {
        let defaults = UserDefaults(suiteName: "group.com.liturgiadaily.app")
        let season   = defaults?.string(forKey: "season")   ?? "Ordinary Time"
        let color    = defaults?.string(forKey: "color")    ?? "Green"
        let colorHex = defaults?.string(forKey: "colorHex") ?? "#4A7C59"
        return LiturgiaEntry(date: Date(), season: season, color: color, colorHex: colorHex)
    }
}

// ── Home-screen widget view ───────────────────────────────────────────────────

struct LiturgiaWidgetView: View {
    var entry: LiturgiaEntry

    var body: some View {
        ZStack {
            Color(hex: entry.colorHex).opacity(0.85)
            VStack(spacing: 4) {
                Text("✝")
                    .font(.title2)
                    .opacity(0.7)
                Text("LITURGIA")
                    .font(.system(size: 8, weight: .bold))
                    .tracking(1.5)
                    .opacity(0.7)
                Text(entry.season)
                    .font(.system(size: 13, weight: .bold))
                    .multilineTextAlignment(.center)
                Circle()
                    .fill(Color.white.opacity(0.6))
                    .frame(width: 7, height: 7)
                Text(entry.color)
                    .font(.system(size: 10, weight: .semibold))
            }
            .foregroundColor(.white)
            .padding(8)
        }
    }
}

// ── Lock-screen accessory views (iOS 16+) ─────────────────────────────────────

@available(iOSApplicationExtension 16.0, *)
struct LiturgiaCircularView: View {
    var entry: LiturgiaEntry
    var body: some View {
        ZStack {
            Color(hex: entry.colorHex)
            Text("✝").font(.title3).foregroundColor(.white)
        }
    }
}

@available(iOSApplicationExtension 16.0, *)
struct LiturgiaRectangularView: View {
    var entry: LiturgiaEntry
    var body: some View {
        HStack(spacing: 6) {
            Text("✝")
            Text(entry.season).bold()
        }
        .font(.caption)
        .foregroundColor(.white)
    }
}

// ── Widget entry view (dispatches to the correct view per family) ─────────────

struct LiturgiaWidgetEntryView: View {
    var entry: LiturgiaEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        if #available(iOSApplicationExtension 16.0, *) {
            switch family {
            case .accessoryCircular:
                LiturgiaCircularView(entry: entry)
            case .accessoryRectangular:
                LiturgiaRectangularView(entry: entry)
            default:
                LiturgiaWidgetView(entry: entry)
            }
        } else {
            LiturgiaWidgetView(entry: entry)
        }
    }
}

// ── Color helper ──────────────────────────────────────────────────────────────

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xFF) / 255
        let g = Double((int >> 8)  & 0xFF) / 255
        let b = Double(int         & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}

// ── Widget configuration ──────────────────────────────────────────────────────

@main
struct LiturgiaWidget: Widget {
    let kind = "LiturgiaWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: LiturgiaProvider()) { entry in
            LiturgiaWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Liturgia Daily")
        .description("Today's liturgical color and season at a glance.")
        .supportedFamilies(supportedFamilies)
    }

    private var supportedFamilies: [WidgetFamily] {
        if #available(iOSApplicationExtension 16.0, *) {
            return [
                .systemSmall,
                .systemMedium,
                .accessoryCircular,    // lock screen circular slot (iOS 16+)
                .accessoryRectangular, // lock screen rectangular slot (iOS 16+)
            ]
        }
        return [.systemSmall, .systemMedium]
    }
}
