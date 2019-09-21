/*
  WriteSingleField
  
  Description: Writes a value to a channel on ThingSpeak every 20 seconds.
  
  Hardware: Arduino Ethernet
  
  !!! IMPORTANT - Modify the secrets.h file for this project with your network connection and ThingSpeak channel details. !!!
  
  Note:
  - Requires the Ethernet library
  
  ThingSpeak ( https://www.thingspeak.com ) is an analytic IoT platform service that allows you to aggregate, visualize, and 
  analyze live data streams in the cloud. Visit https://www.thingspeak.com to sign up for a free account and create a channel.  
  
  Documentation for the ThingSpeak Communication Library for Arduino is in the README.md folder where the library was installed.
  See https://www.mathworks.com/help/thingspeak/index.html for the full ThingSpeak documentation.
  
  For licensing information, see the accompanying license file.
  
  Copyright 2018, The MathWorks, Inc.
*/


#include "ThingSpeak.h"
#include <SPI.h>
#include <Ethernet.h>
#include "secrets.h"

byte mac[] = {0x90, 0xA2, 0xDA, 0x0D, 0x58, 0x6E };
IPAddress ip(192, 168, 0, 77);
IPAddress gateway(192, 168, 0, 1);
IPAddress mask(255, 255, 255, 0);

EthernetClient client;

unsigned long myChannelNumber = SECRET_CH_ID;
const char * myWriteAPIKey = SECRET_WRITE_APIKEY;

int number = 0;
int sensePin = A0;  //This is the Arduino Pin that will read the sensor output
int sensorInput;    //The variable we will use to store the sensor input
float tempc;        //The variable we will use to store temperature in degrees. 


void setup() {

  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }



  /// disabeling the SD card
  pinMode(53, OUTPUT);
  pinMode(4, OUTPUT);
  digitalWrite(4, HIGH);

  // start the Ethernet connection:
  Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // Check for Ethernet hardware present
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
      while (true) {
        delay(1); // do nothing, no point running without Ethernet hardware
      }
    }
    if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  } else {
    Serial.print(" DHCP assigned IP ");
    Serial.println(Ethernet.localIP());
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  
  // Initialize ThingSpeak
  ThingSpeak.begin(client); 
}

void loop() {
  
  //sensorInput = analogRead(A0);    //read the analog sensor and store it
  //temp = (double)sensorInput / 1024.0;       //find percentage of input reading
  //temp = temp * 5.0;                 //multiply by 5V to get voltage
  //temp = temp - 0.5;               //Subtract the offset 
  //temp = temp * 100.0;               //Convert to degrees
  tempc = ( 5.0 * analogRead(A0) * 100.0) / 1024.0;
  //String analogPin0 = String(tempc);
  Serial.println(tempc);

  // Write to ThingSpeak
  // pieces of information in a channel.  Here, we write to field 1.
  int x = ThingSpeak.writeField(myChannelNumber, 1, tempc, myWriteAPIKey);
  if(x == 200){
    Serial.println("Channel update successful.");
  }
  else{
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }
  
  delay(20000); // Wait 20 seconds to update the channel again
}
