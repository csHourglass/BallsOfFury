
# BALLS OF FURY
View our current progress - https://cshourglass.github.io/BallsOfFury
[![Youtube trailer](https://img.youtube.com/vi/OLbmxvDB_dE/0.jpg)](https://www.youtube.com/watch?v=OLbmxvDB_dE)

## Team - RED FOUR
[David Glines](https://github.com/dglines), [Alvin Nguyen](https://github.com/alveeno), [Duc Nguyen](https://github.com/davidnguyen2302), [Alexander Reid](https://github.com/cshourglass)



## Introduction:
For our project, we plan on creating a fighting game inspired by Lethal League, a game made by developer Team Reptile <Steam Link>.  The objective of our game will be the same: hit the opponent with a projectile to knock them out and the last person with remaining lives wins.  Instead of only hitting a ball, we wanted to make the experience more like dodgeball where the player needs to pick up balls to use as weapons.  However, we will simplify the gameplay by not enforcing traditional dodgeball rules, such as knocking an opponent out by catching the ball, and by having the game adopt a side view perspective, limiting the players’ options when dodging a ball.  Additionally, we will use the open court rule, meaning the players can move anywhere on the court to get a better shot.

## Animated Resources:
The game will have two main animated resources, the players and the dodgeballs.  The background will contain animation if time allows us to implement it.

Player - The player character will have many animations to show the user its current state, such as:
Idling with and without a ball

Running while moving around the canvas

Jumping

Throwing a ball

Catching an incoming ball

Parrying an incoming ball if holding a ball

Dodgeball - The dodgeball will be animated using squash and stretch techniques to convey movement and collisions.  The ball will also change color based on the team who threw the ball and their color.

## Controls:
The player will have several actions that can be done using keyboard and mouse.  These actions include running, jumping, throwing, catching and parrying.

Running - ‘A’ will make the player to run left and ‘D’ will make the player run right.

Jumping - Jumping can be done using ‘Spacebar’.  If ‘A’ or ‘D’ is held down, the player will also move left and right while airborne.

Throwing - While holding a ball, the player will throw the ball toward the mouse cursor when upon clicking the ‘Left Mouse Button’.

Catching - If the player does not have a ball, an incoming ball can be caught by clicking the ‘Right Mouse Button’ just before the ball hits the player.

Parrying - If the player has a ball, the ‘Right Mouse Button’ will instead make the player hit an incoming balls back in the opposite direction using the ball in hand.

## Interactions:
Interactions between the dodgeballs, the players and the stage will be done through collisions.

Player vs Player - Players will pass through each other without effect.  There is no collision between them.

Player vs Slow or Idle Dodgeball - If the player is holding a ball, they will pass through any slow or idle dodgeballs with no effect.  If the player is not holding a ball, they will automatically pick up the dodgeball nearby.

Player vs Fast Enemy Dodgeball - The player will be hit and knocked out, resulting in losing a life. After the player is hit, the ball will bounce off of them as if it collided with a wall (See Dodgeball vs Wall).  If the player is in the catching state before the ball hits, the player will catch the ball instead.  If in the parrying state, the ball will fly back and become the player’s projectile.

Player vs Fast Player Dodgeball - The ball will pass through the player with no effect.  If the player is in the catching state, they will catch the ball instead.

Player vs Wall - The player will stop moving and will be unable to move through the wall, only allowing movement in a different direction.

Dodgeball vs Wall - The dodgeball will reverse direction, losing some speed after collision.

## Extras:
In addition to the content above, we would like to add these features if time allows:

Multi-Device Multiplayer - Adding some form of LAN or Online functionality.

Dodging Mechanic - Giving the player the ability of dodge roll or dodge in place gives them more options to explore.

Pump Fake Mechanic - Allow the player to show part of the throwing animation, but not actually throw the ball in order to trick the opponent.

Special Attacks - A powerful attack that has limited use to change the pace of the game.

More Types of Players - Each with their own look and playstyle.  If the Special Attack extra is added, they will also have their own unique attack.

Platforms and Additional Maps - For now, we plan to have a rectangular enclosed arena, small enough to fit on the canvas.  We would like to add additional maps with different elements that could provide a new challenge or alter gameplay.

Map Animations - Additional animations based on the theme of the map for cosmetic effect.

Dodgeball vs Dodgeball Collision - For our first version, the balls will pass through each other with no collision.  We could possibly add angle-based collision to the dodgeballs in later versions if time allows.

Controller Support - This would allow multiple players to play against each other on one device.

Single Player Content - After we finish the multiplayer portion of the game, some of the team may add a single player story or challenge mode.

A.I. Opponents - By creating AI for the game, a player could play the multiplayer mode by themselves and it would provide more options for Single Player, if implemented.

Throw Charging Mechanic - A quick tap of the throw button will throw the ball at a normal speed, while holding the throw button down will cause the player to wind up and throw the ball faster.

Varied Knockout Animations - A different animation will play depending on if the player is hit in the head, body or feet.
Duck - Player can crouch. 




## Timeline:
Prototype - For our prototype, we will have a moveable player character that can run, jump and throw a ball.  The player will permanently have a ball until proper functionality is added for picking up balls.  The player will have filler animations that can be replaced once we have better sprite sheets.  The ball thrown will also move away from the player, but collision may not be implemented.

Minimum Deliverable - Must implement multiplayer functionality in some way (either controller support or a establishing connection across multiple devices).  All animations and controls will be fully implemented and interactions between players, environment, and balls will be functioning per their descriptions.  The minimum deliverable will only contain one level.  Each player will have a lives meter that represent their current number of lives.  When a player is hit by an enemy ball, the player’s lives meter will decrement and the player will “die” and respawn somewhere on the map.  When a player’s lives meter reaches zero, they will not respawn.

Final Game - The final game will contain all the controls and interactions listed above with one or more of the extra features outside of controller functionality and multi-device multiplayer.  Appropriate animations will be present and polished for each entity state.  A proper menu system will be introduced, so restarting the game to play another round will be unnecessary.

## References:
Lethal League - Fighting game by Team Reptile

Dodgeball - Wikipedia page
