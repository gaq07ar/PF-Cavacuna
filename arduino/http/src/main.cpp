#include <Arduino.h>
#include <ArduinoHttpClient.h>
#include <SPI.h>
#include <Ethernet.h>
#include "secrets.h"

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield

char serverAddress[] = SECRET_API_ADDRESS;  // server address
int port = 3000;
bool executeOnce = false;

EthernetClient ethernet;
HttpClient client = HttpClient(ethernet, serverAddress, port);

String id = String(SECRET_CH_ID);
String description = "Arduino Testing";
int amountOfSlots = 14;
bool monitoredMode = true;
int minTemp = 2;
int maxTemp = 8;

String ampersam = "&";

byte mac[] = {
  0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02
};


void setup() {
  // You can use Ethernet.init(pin) to configure the CS pin
  //Ethernet.init(10);  // Most Arduino shields
  //Ethernet.init(5);   // MKR ETH shield
  //Ethernet.init(0);   // Teensy 2.0
  //Ethernet.init(20);  // Teensy++ 2.0
  //Ethernet.init(15);  // ESP8266 with Adafruit Featherwing Ethernet
  //Ethernet.init(33);  // ESP32 with Adafruit Featherwing Ethernet

  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // start the Ethernet connection:
  Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
    } else if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    // no point in carrying on, so do nothing forevermore:
    while (true) {
      delay(1);
    }
  }
  // print your local IP address:
  Serial.print("My IP address: ");
  Serial.println(Ethernet.localIP());
}

void sendPostRequest(String route, String message) {
  Serial.println("making POST request");
  String postData = message;
  client.beginRequest();
  client.post(route);
  client.sendHeader("Content-Type", "application/x-www-form-urlencoded");
  client.sendHeader("Content-Length", postData.length());
  client.sendHeader("X-Custom-Header", "custom-header-value");
  client.beginBody();
  client.print(postData);
  client.endRequest();

  // read the status code and body of the response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);
  Serial.println(postData);
}

void sendConfig() {
  String route = "/api/device";
  String message = "id=" + id + ampersam + "slots_amount=" + amountOfSlots + ampersam + "monitored_node=" + monitoredMode + ampersam + "description=" + description + ampersam + "min_temp=" + minTemp + ampersam + "max_temp=" + maxTemp;
  sendPostRequest(route, message);
}

void sendAlert() {
  String route = "/api/alarm/generate";
  String message = "deviceId=" + id;
  sendPostRequest(route, message);
}

void loop() {
  if(!executeOnce) {
    sendConfig();
    // Envio de prueba
    sendAlert();
    executeOnce = true;
  }

  delay(5000);
}