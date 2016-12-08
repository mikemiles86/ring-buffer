/*
function RingBuffer(size) {
  var bufferSize = size,
      buffer = new Array(size),
      readers = [],
      bufferRead = bufferWrite = bufferCount = 0
  this.getBuffer = function() { return buffer }
  this.getRead = function() { return bufferRead }
  this.read = function() {
    var data = buffer[bufferRead]
    buffer[bufferRead] = null
    bufferRead = this.getNextPointer(bufferRead)
    --bufferCount
    return data
  }
  this.readBuffer = function(pointer) {
    return buffer[pointer];
  }
  this.write = function(data) {
    buffer[bufferWrite] = data
    var len = readers.length;
    if (len > 0) {
      for (var r = 0; r < len; ++r) {
        readers[r].removeRead(bufferWrite)
      }
    }
    if ((bufferWrite == bufferRead) && (buffer[bufferRead+1] != null)) {
      bufferRead = this.getNextPointer(bufferRead)
    }
    bufferWrite = this.getNextPointer(bufferWrite)
    ++bufferCount
  }
  this.count = function() {
    return bufferCount
  }
  this.join = function() {
    var reader = new BufferReader(this)
    readers[readers.length] = reader
    return reader
  }
  this.getNextPointer = function(current_pointer) {
    return (current_pointer >= (bufferSize-1)) ? 0:(current_pointer+1)
  }
}

function BufferReader(ring_buffer) {
  var ringBuffer = ring_buffer,
      readIndex = ring_buffer.getRead,
      hasRead = new Array();
  this.getBuffer = function() { return ringBuffer.getBuffer()}
  this.read = function() {
    var data =  null
    if (hasRead.indexOf(readIndex) < 0) {
      data = ringBuffer.readBuffer(readIndex);
      hasRead[hasRead.length] = readIndex;
      readIndex = ringBuffer.getNextPointer(readIndex);
    }
    return data;
  }
  this.removeRead = function(removeIndex) {
    var index = hasRead.indexOf(removeIndex)
    if (index >= 0) {
      for(var i = index, len = hasRead.length -1; i < len; ++i) {
        hasRead[i] = hasRead[i + 1]
      }
      hasRead.length = len;
    }
  }
}
*/


var RingBuffer = function(size) {
  this.bufferSize = size
  this.buffer = new Array(size)
  this.readers = []
  this.bufferRead = this.bufferWrite = this.bufferCount = 0
}

RingBuffer.prototype.read = function() {
  var data = this.buffer[this.bufferRead]
  this.buffer[this.bufferRead] = null
  this.bufferRead = this.getNextPointer(this.bufferRead)
  this.bufferCount--
  return data;
}

RingBuffer.prototype.write = function(data) {
  this.buffer[this.bufferWrite] = data
  if (this.readers.length > 0) {
    for( var r =0, len = this.readers.length; r < len; ++r) {
      this.readers[r].removeRead(this.bufferWrite)
    }
  }
  if ((this.bufferWrite == this.bufferRead) && (this.buffer[this.bufferRead+1] != null)) {
    this.bufferRead = this.getNextPointer(this.bufferRead)
  }
  this.bufferWrite = this.getNextPointer(this.bufferWrite)
  this.bufferCount++
}

RingBuffer.prototype.count = function() {
  return this.bufferCount
}

RingBuffer.prototype.join = function() {
  var reader = new BufferReader(this)
  return this.readers[this.readers.length] = reader
}

RingBuffer.prototype.getNextPointer = function(pointer) {
  return (pointer >= (this.bufferSize-1)) ? 0:(pointer+1)
}

var BufferReader = function(ringBuffer) {
  this.ringBuffer = ringBuffer
  this.readIndex = ringBuffer.bufferRead
  this.hasRead = []
}

BufferReader.prototype.read = function() {
  var data =  null
  if (this.hasRead.indexOf(this.readIndex) < 0) {
    data = this.ringBuffer.buffer[this.readIndex];
    this.hasRead.push(this.readIndex);
    this.readIndex = this.ringBuffer.getNextPointer(this.readIndex);

  }
  return data;
}

BufferReader.prototype.removeRead = function(removeIndex) {
  var index = this.hasRead.indexOf(removeIndex)
  if (index >= 0) {
    for(var i = index, len = this.hasRead.length -1; i < len; ++i) {
      this.hasRead[i] = this.hasRead[i + 1]
    }
    this.hasRead.length = len;
  }
}

