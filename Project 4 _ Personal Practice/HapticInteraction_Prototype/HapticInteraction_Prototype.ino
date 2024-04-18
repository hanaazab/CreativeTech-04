#define VIBRATION_MOTOR_LEFT 13 // Left motor pin
#define VIBRATION_MOTOR_RIGHT 14 // Right motor pin
#define BUTTON_PIN 2 // Button pin

void setup() {
  pinMode(VIBRATION_MOTOR_LEFT, OUTPUT);
  pinMode(VIBRATION_MOTOR_RIGHT, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP); // Set the button as an input with an internal pull-up
}

void loop() {
  // Check if the button is pressed
  if (digitalRead(BUTTON_PIN) == LOW) { // Assuming the button is active LOW
    // If the button is pressed, play the vibration pattern
    hapticPattern();
  } else {
    // If the button is not pressed, make sure motors are off
    digitalWrite(VIBRATION_MOTOR_LEFT, LOW);
    digitalWrite(VIBRATION_MOTOR_RIGHT, LOW);
  }
}

void hapticPattern() {
  // Both motors short vibration
  vibrateBothShort();
  
  // Long pause
  delay(500); // Adjust this for the length of your long pause

  // Left motor short vibration, right motor off
  vibrateLeftShort();

  // Right motor long vibration, left motor off
  vibrateRightLong();
}

void vibrateBothShort() {
  digitalWrite(VIBRATION_MOTOR_LEFT, HIGH);
  digitalWrite(VIBRATION_MOTOR_RIGHT, HIGH);
  delay(200); // Short vibration time
  digitalWrite(VIBRATION_MOTOR_LEFT, LOW);
  digitalWrite(VIBRATION_MOTOR_RIGHT, LOW);
  delay(200); // Brief break between vibrations
  digitalWrite(VIBRATION_MOTOR_LEFT, HIGH);
  digitalWrite(VIBRATION_MOTOR_RIGHT, HIGH);
  delay(200); // Second short vibration time
  digitalWrite(VIBRATION_MOTOR_LEFT, LOW);
  digitalWrite(VIBRATION_MOTOR_RIGHT, LOW);
}

void vibrateLeftShort() {
  digitalWrite(VIBRATION_MOTOR_LEFT, HIGH);
  delay(200); // Short vibration time
  digitalWrite(VIBRATION_MOTOR_LEFT, LOW);
  delay(500); // Long pause after single short vibration
}

void vibrateRightLong() {
  digitalWrite(VIBRATION_MOTOR_RIGHT, HIGH);
  delay(1000); // Long vibration time
  digitalWrite(VIBRATION_MOTOR_RIGHT, LOW);
}
