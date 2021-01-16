from yeelight import Bulb
import sys
ip = sys.argv[1]
red = sys.argv[2]
green = sys.argv[3]
blue = sys.argv[4]
bulb = Bulb(ip)
result = bulb.set_rgb(int(red), int(green), int(blue))
print(result)
