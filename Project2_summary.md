# Project 2 AI Chatbot

**Week 1** Hello World! 
Following a tutorial provided on replit: (https://replit.com/@hanaazab1/Basic-Discord-Bot)
I created a basic discord bot that responds to $basicbot with Hello! 
![Hello World](https://github.com/hanaazab/CreativeTech-04/blob/main/HelloWorld_00.png)

**Week 2 & 3** UI Experiments & Decision Tree Bot 
I began by designing a "Time Bot" which encouraged rest above all else. I was quite busy at the time. Using this simple node structure:

# Define the decision tree structure
rest_node = Node("You should rest.")
no_time_node = Node("You don’t have time.")
will_you_rest_node = Node("Will you rest?", options=[
                          {"label": "No", "node": rest_node},
                          {"label": "Maybe", "node": no_time_node}])
have_you_rested_node = Node("Have you rested?", options=[
                            {"label": "No", "node": will_you_rest_node}])
root = Node("Do you have time?", options=[
            {"label": "Yes", "node": have_you_rested_node},
            {"label": "No", "node": rest_node}]) 

![Time Bot](https://github.com/hanaazab/CreativeTech-04/blob/main/DecisionTree.png) 

After, succeful implementation. I worked tpo engage a more robust user experience through varied buttons, modals, and node structure. 
**Concept Overview**
    Bot Personality: Wise and stern; the bot should provide helpful advice, but in a firm and authoritative manner.
    Main Functions: The bot could serve as a guide for productivity or wellness, offering advice, reminders, or decisions based on user inputs and interactions.


**Decision Tree Structure**
Root Node: Start with a question that determines the user's immediate need.
Question: "What can I assist you with today?"
  Options:
    Work-related advice
    Wellness check
    Setting reminders
Work-related Advice Node: Guides on productivity and work decisions.
  Question: "Select the area you need help with:"
  Response Type: "select" (dropdown)
    Options:
    Time management
    Prioritizing tasks
    Dealing with stress
Wellness Check Node: Provides wellness advice.
  Question: "How are you feeling today?"
  Response Type: "modal"
    Options: User can input how they feel, and the bot responds based on the mood described.
Setting Reminders Node: Help setting up reminders.
  Question: "What type of reminder would you like to set?"
  Response Type: "button"
    Options:
    Meeting reminder
    Water drinking reminder
    Break reminder
Follow-up Nodes (e.g., for Time Management):
  Question: "Do you need help planning your tasks for the day or managing ongoing tasks?"
  Response Type: "button"
      Options:
      Plan day
      Manage tasks


**UI Elements**
class DecisionModal(Modal):
    def __init__(self, node):
        super().__init__(title=node.question)
        for option in node.options:
            self.add_item(TextInput(label=option['label'], placeholder=option['placeholder']))

class DecisionOptionsView(View):
    def __init__(self, node):
        super().__init__()
        if node.response_type == "select":
            self.add_item(DecisionSelect(node))
        else:
            for option in node.options:
                button_style = discord.ButtonStyle.danger if 'urgent' in option else discord.ButtonStyle.primary
                self.add_item(DecisionButton(option['label'], option['node'], style=button_style))

![Modal Experiment](https://github.com/hanaazab/CreativeTech-04/blob/main/ModalExperiment_01.png)
![Replit Link](https://replit.com/@hanaazab1/Decision-Tree-Bot#main.py)
