# Deign Pattern Desicions  
* Rely on field tests code provided by OpenZeppelin.
  * Transferable Ownership handling.
  * Protection of certian methods (like `kill()` oder `emergencyStop()`).
* Implementation of a simple circit breaker which cuts of some methods (like `buy(...)`).
* The contract is mortal. In case everything goes wrong it can by killed by the owner.
* Since this was a solidity course I tried to stick to solidity tests. 
Saidly not everything was possible. Things like complety test money transfer, painless testing of excepting handling, ...
I've put some comments to those parts.
* The Frontend-Part isn't written really defensive.
Exceptions like lossing network connection, not engouh Ether Exceptions and these stuff isn't covered properly.
I did this to focus on solidity and not spoile the code with some boilerplate which isn't the focus of this course. 
