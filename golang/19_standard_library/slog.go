package main

import (
	"log"
	"log/slog"
	"os"
)

/*
Logging
 log       the simple classic logger
 log/slog  structured logging (Go 1.21): key/value pairs, levels, text or JSON output
*/

func logging() {
	logger := log.New(os.Stdout, "[app] ", 0)
	logger.Println("classic log line")

	text := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		ReplaceAttr: dropTime, // keep the output identical between runs
	}))
	text.Info("order created", "id", 42, "total", 1250.5)
	text.Debug("not shown: below the default Info level")

	jsonLogger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level:       slog.LevelDebug,
		ReplaceAttr: dropTime,
	}))
	reqLogger := jsonLogger.With("request_id", "abc-123") // attached to every line
	reqLogger.Debug("cache miss", "key", "user:7")
	reqLogger.Warn("slow query", slog.Duration("took", 1500_000_000))
}

func dropTime(groups []string, a slog.Attr) slog.Attr {
	if a.Key == slog.TimeKey {
		return slog.Attr{}
	}
	return a
}
