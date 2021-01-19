from yeelight import Bulb, HSVTransition, Flow, TemperatureTransition, SleepTransition, RGBTransition
import sys
ip = sys.argv[1]
ip2 = sys.argv[2]
bulb = Bulb(ip)
bulb2 = Bulb(ip2)

bulb.set_rgb(255, 255, 255)
bulb2.set_rgb(255, 255, 255)

transitions = [
    RGBTransition(255, 255, 255, duration=1500),
    RGBTransition(0, 255, 0, duration=1500),
    RGBTransition(255, 255, 255, duration=1500)
]

flow = Flow(
    count=2,
    transitions=transitions
)


bulb.start_flow(flow)
bulb2.start_flow(flow)
