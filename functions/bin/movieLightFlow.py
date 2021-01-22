from yeelight import Bulb, HSVTransition, Flow, TemperatureTransition, SleepTransition, RGBTransition
import sys
ip = sys.argv[1]
ip2 = sys.argv[2]
ip3 = sys.argv[3]

bulb = Bulb(ip)
bulb2 = Bulb(ip2)
bulb3 = Bulb(ip3)

bulb.turn_on()
bulb2.turn_on()
bulb3.turn_off()

bulb.set_brightness(10)
bulb2.set_brightness(10)

bulb.set_rgb(255, 255, 255)
bulb2.set_rgb(255, 255, 255)

