# Avoiding Common Attacks
* I haven't used recursive calls or any external function calls.
* I haven't used any loops over arrays which could exceed gas limits.
* In a real project I would store the strings offchain and only persit the hashes. 
But this was out of scope for the project.
* Using field tested code from open zeppelin.
* Restrict access to critical functions.
