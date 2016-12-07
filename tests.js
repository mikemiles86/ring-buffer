
function testOne() {

// Load test, read in order, with a random capacity between 9mm-10mm
  var min = 999990,
      max = 1000000,
      random_capacity = Math.floor(Math.random() * (max - min + 1)) + min;

  var ring = new RingBuffer(random_capacity)

 var start = new Date().getTime()

  // Fill must fill the random capacity
  for ( var x = 0; x < random_capacity; x ++){
    ring.write(x)
  }

  // Read the random capacity, in order
  for ( var y = 0; y < random_capacity; y ++){
    ring.read();
  }

  var end = new Date().getTime();

  console.log('Test passed, ' + random_capacity + ' executions in ' + (end - start) + 'ms' )
}
