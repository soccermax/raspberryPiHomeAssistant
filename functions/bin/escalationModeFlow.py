from yeelight import Bulb, HSVTransition, Flow, TemperatureTransition, SleepTransition, RGBTransition
import sys
ip = sys.argv[1]
ip2 = sys.argv[2]
bulb = Bulb(ip)
bulb2 = Bulb(ip2)

bulb.turn_on()
bulb2.turn_on()


bulb.set_rgb(255, 255, 255)
bulb2.set_rgb(255, 255, 255)

transitions = [
    RGBTransition(255, 0, 0, duration=500),
    RGBTransition(255, 215, 0, duration=500),
    RGBTransition(50, 205, 50, duration=500),
    RGBTransition(0, 206, 209, duration=500),
    RGBTransition(0, 0, 255, duration=500),
    RGBTransition(255, 255, 255, duration=500),
    RGBTransition(139, 0, 139, duration=500)
]

flow = Flow(
    count=0,
    transitions=transitions
)


bulb.start_flow(flow)
bulb2.start_flow(flow)
