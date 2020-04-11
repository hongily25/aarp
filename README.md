# My Heartbeat

My heartbeat is an application that uses real data from Fitbit to analyze heartbeat abnormalities. If it detects an elevated heart rate over a period of time, it automatically turns on a fan to cool down the user if they’re experiencing hot flashes. It also notifies the user through any Amazon echo device. Finally it also uses an Echo button to turn off the smart fan remotely. Here is a simulation of heart palpitations.

#Problems it addresses

Hot flashes
	This application helps users suffering from hot flashes by cooling them down with an automated fan.
Irregular heartbeats
	The application alerts users through any Amazon echo device if they are experiencing irregular heartbeats.

# Dataset

heartbeat.json is real user data from Fitbit using the Fitbit Intraday Heartbeat API.

# How it works

The simulation adds data points to the chart to simulate a user experiencing heart palpitations. If the user has an elevated heart rate over the period of five data points, it triggers an Alexa routine that turns on a smart fan and alerts the user through any echo device.

# Demo

The application is available at https://damp-gorge-66037.herokuapp.com/
