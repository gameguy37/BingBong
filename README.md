# BingBong

## Background

I felt that I basically HAD to create a game rather than a data visualization. I have always loved video games, and I think I'd be a great game developer (there's a reason my github username is gameguy37). My favorite types of games are those that are seemingly simple when first picked up but actually turn out to have a lot of depth as the player gains more experience and learns the ins and outs of the game's mechanics.

In the last few years, there has been a drastic uptick in popularity of "Roguelike" and "Roguelite" style games (notable examples include: Spelunky, Enter the Gungeon, Nuclear Throne, Binding of Isaac, Risk of Rain, Rogue Legacy, and Dead Cells). Some of the key features of these games are as follows:

* The game uses random generation to increase replayability. However, pre-determined level templates are common.
* The game uses permadeath. Once a character dies, the player must begin a new game, known as a "run", which will regenerate the game's levels anew due to procedural generation.
* The player must use resource management to survive. Items that help sustain the player, such as food and healing items, are in limited supply and the player must figure out how to use these most advantageously in order to survive in the dungeon.
* The game has a degree of complexity due to the number of different game systems in place that allow the player to complete certain goals in multiple ways, creating emergent gameplay. For example, to get through a locked door, the player may use a key, attempt to pick the lock, destroy the door, or even tunnel around it, depending on their current situation (health/stamina) and inventory (keys, bombs, etc.).

## Overview

BingBong is a game designed to be easy to pick up and challenging to master. Anyone can play, as the goal is very simple (traverse the screen) and the user interface is even simpler (only 1 button!). BingBong is essentially a fast-paced version of Frogger, but without the ability to retreat. Once a player has chosen to launch their character from one side to the other, the velocity is constant until the safe zone on the opposite side is reached.

The player chooses exactly when to launch their character from one safe zone to the other (top-to-bottom, bottom-to-top, ad infinitum) in order to avoid the gauntlet of enemies, which fly in from either side and move horizontally. Colliding with any enemy immediately ends the game.

## Mechanics

The top and bottom of the screen are designated safe zones where the player character is invincible and collisions with enemies will have no effect. However, if the player doesn't launch their character to the other side in a timely fashion, the character model will begin to grow until it eventually pops and the game is over. There is no concept of levels and the game can not be beaten, however the number of enemies populating the screen will increase as time goes on in order to ramp up the difficulty to the point of impossibility and the player's goal at all times is to beat the high score.

### Powerups

In addition to enemies, powerups will occasionally fly through the screen that can be collected if the player's character model passes through them. The powerups will look visually distinct from enemies in order to inform the player that they are helpful rather than harmful. Some examples of powerups are listed below:

* Temporary Invincibility - Character cannot be killed for 6 seconds
* Bullet Time - Character speed is the same, but enemies are slowed down for 6 seconds
* Wipeout - All enemies are cleared from the screen and new enemies will not spawn for 2 seconds

### Scoring

The player's score goes up by 1 point for each successful traversal of the field. However, there are also other ways to increase total score:
* Some powerups can be helpful in increasing the player's score:
  * When the player is invincible, enemies can be destroyed by passing through them. Destroying an enemy grants 1 bonus point.
  * Score++ is a powerup worth an immediate 3 points to the player's score.
* Near Misses - if a player is skillful enough to send their character across the gauntlet and come extremely close to an enemy without actually hitting it, the score will be incremented by 1 additional point.
* Score Multipliers - Before starting the game, the player will have the choice to select from multiple score modifiers. Each of these make the game harder in some way and have associated score multipliers (x1.1, x1.25, etc.) that will be applied at the end of the game to calculate the player's final score. Some of these modifiers are listed below:
  * Larger Enemies
  * "Fat" mode - Player character is larger and moves slower
  * Randomize Enemy Speeds - Enemies can be launched with velocities that are slower or faster than standard
  * Angular Enemy Trajectories (default behavior is strictly horizontal movement)
  * Rotating Enemies
  * Beast Mode - This modifier is a special switch that will turn on all existing difficulty modifiers. The reward for using this modifier is a bonus "BEAST MODE" multiplier in addition to the regular multiplicative bonuses that come with each individual modifier for experienced players to quickly boost their score.

## MVPs

1. The base game (with no powerups or score modifiers) works as designed. 
  * A player can send an input to the game to send their character from one safezone to the other
  * collision detection works as intended
  * The game ends after one collision and can properly be restarted
2. Powerups implemented
  * Powerups are visually distinct from enemies
  * Powerups give the player character the intended attributes
  * A timer of some sort is displayed on the screen to let the player know the length of time the current powerup will be in effect
3. Score multipliers implemented
  * Clickable, styled buttons exist before the game starts to permit the selection of game modifiers / score multipliers
  * There is a score breakdown shown to the player at the end of the game that shows the base points, the effects of each multiplier on the base score, and a total score after all multipliers are applied

## Technologies

BingBong will be written using a combination of Javascript and Canvas. Additional libraries may be required if those two technologies turn out to not be sophisticated enough to handle everything I want to implement, and I will list them here if I end up using more than those two.

## Implementation Timeline

Day 1: Setup project skeleton with anticipated files, webpack, config files, etc. and begin work on the core game mechanics, initial paramaters (player/enemy size, speed, etc.) and collision detection. Special attention will be required for collision with objects that not only translate across the screen, but rotate as well.

Day 2: 