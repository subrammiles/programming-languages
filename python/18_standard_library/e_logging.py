"""
logging - better than print() for real programs
 levels: DEBUG < INFO < WARNING < ERROR < CRITICAL
 - set the level once to control how much is shown
 - every message has a time, level and source
 - can write to files, rotate them, send them elsewhere
Use logging.getLogger(__name__) in each module.
"""
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
    datefmt="%H:%M:%S",
    stream=sys.stdout,
)
log = logging.getLogger("shop.orders")

log.debug("not shown: below the INFO level")
log.info("order %s created", 42)  # use %s args, not f-strings: formatted only if shown
log.warning("stock is low: %d left", 3)
log.error("payment failed")

try:
    1 / 0
except ZeroDivisionError:
    log.exception("something broke")  # logs the traceback too

log.setLevel(logging.DEBUG)
log.debug("now debug messages appear")
