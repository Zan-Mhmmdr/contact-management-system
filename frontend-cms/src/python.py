class Hero():
    def __init__ (self, name, power):
        self.name = name
        self.power = power 

    def attack(self, enemy): 
        print(f"{self.name} attaks {enemy.name} with {self.power} power!")
        enemy.health = enemy.health - 20
        print(f"{enemy.name} has {enemy.health} health left.")
        
class Monster(): 
    def __init__ (self, name, power, health=100):
        self.name = name
        self.power = power 
        self.health = health
        
    
yurivinee = Hero("Yurivinee", "Fireball")    
serie = Monster("Serie", 'lightning')
yurivinee.attack(serie)