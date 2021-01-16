from yeelight import Bulb
import sys
ip = sys.argv[1]
bulb = Bulb(ip)
result = bulb.turn_on()
print(result)
