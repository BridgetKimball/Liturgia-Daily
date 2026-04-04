package com.liturgiadaily.app

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews

/**
 * LiturgiaWidgetProvider updates the Android home-screen widget.
 *
 * The main React Native app writes today's liturgical data to
 * SharedPreferences (via AsyncStorage) whenever it launches.
 * This provider reads those values and applies them to the widget layout.
 */
class LiturgiaWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        val prefs  = context.getSharedPreferences("liturgia_widget_data", Context.MODE_PRIVATE)
        val season = prefs.getString("season", "Ordinary Time") ?: "Ordinary Time"
        val color  = prefs.getString("color",  "Green")         ?: "Green"

        for (id in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.liturgia_widget)
            views.setTextViewText(R.id.widget_season, season)
            views.setTextViewText(R.id.widget_color,  color)
            appWidgetManager.updateAppWidget(id, views)
        }
    }
}
