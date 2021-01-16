from yeelight import Bulb
import sys
ip = sys.argv[1]
brightness = sys.argv[2]
bulb = Bulb(ip)
result = bulb.set_brightness(int(brightness))
print(result)
