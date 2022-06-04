var _auchCRCHi = [
  0, 193, 129, 64, 1, 192, 128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192,
  128, 65, 0, 193, 129, 64, 0, 193, 129, 64, 1, 192, 128, 65, 1, 192, 128, 65,
  0, 193, 129, 64, 0, 193, 129, 64, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192,
  128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192, 128, 65, 0, 193, 129, 64,
  0, 193, 129, 64, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192, 128, 65, 1, 192,
  128, 65, 0, 193, 129, 64, 0, 193, 129, 64, 1, 192, 128, 65, 1, 192, 128, 65,
  0, 193, 129, 64, 1, 192, 128, 65, 0, 193, 129, 64, 0, 193, 129, 64, 1, 192,
  128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 0, 193, 129, 64, 1, 192, 128, 65,
  0, 193, 129, 64, 1, 192, 128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 0, 193,
  129, 64, 1, 192, 128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192, 128, 65,
  0, 193, 129, 64, 0, 193, 129, 64, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192,
  128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192, 128, 65, 0, 193, 129, 64,
  0, 193, 129, 64, 1, 192, 128, 65, 1, 192, 128, 65, 0, 193, 129, 64, 0, 193,
  129, 64, 1, 192, 128, 65, 0, 193, 129, 64, 1, 192, 128, 65, 1, 192, 128, 65,
  0, 193, 129, 64,
];
var _auchCRCLo = [
  0, 192, 193, 1, 195, 3, 2, 194, 198, 6, 7, 199, 5, 197, 196, 4, 204, 12, 13,
  205, 15, 207, 206, 14, 10, 202, 203, 11, 201, 9, 8, 200, 216, 24, 25, 217, 27,
  219, 218, 26, 30, 222, 223, 31, 221, 29, 28, 220, 20, 212, 213, 21, 215, 23,
  22, 214, 210, 18, 19, 211, 17, 209, 208, 16, 240, 48, 49, 241, 51, 243, 242,
  50, 54, 246, 247, 55, 245, 53, 52, 244, 60, 252, 253, 61, 255, 63, 62, 254,
  250, 58, 59, 251, 57, 249, 248, 56, 40, 232, 233, 41, 235, 43, 42, 234, 238,
  46, 47, 239, 45, 237, 236, 44, 228, 36, 37, 229, 39, 231, 230, 38, 34, 226,
  227, 35, 225, 33, 32, 224, 160, 96, 97, 161, 99, 163, 162, 98, 102, 166, 167,
  103, 165, 101, 100, 164, 108, 172, 173, 109, 175, 111, 110, 174, 170, 106,
  107, 171, 105, 169, 168, 104, 120, 184, 185, 121, 187, 123, 122, 186, 190,
  126, 127, 191, 125, 189, 188, 124, 180, 116, 117, 181, 119, 183, 182, 118,
  114, 178, 179, 115, 177, 113, 112, 176, 80, 144, 145, 81, 147, 83, 82, 146,
  150, 86, 87, 151, 85, 149, 148, 84, 156, 92, 93, 157, 95, 159, 158, 94, 90,
  154, 155, 91, 153, 89, 88, 152, 136, 72, 73, 137, 75, 139, 138, 74, 78, 142,
  143, 79, 141, 77, 76, 140, 68, 132, 133, 69, 135, 71, 70, 134, 130, 66, 67,
  131, 65, 129, 128, 64,
];

let cmd = [];

function CRC16(t) {
  for (var n = 255, o = 255, i = 0; i < t.length; i++) {
    var a = n ^ t[i];
    n = o ^ _auchCRCHi[a];
    o = _auchCRCLo[a];
  }
  return [n, o];
}

function parseHexString(str) {
  var result = [];
  while (str.length >= 2) {
    result.push(parseInt(str.substring(0, 2), 16));
    str = str.substring(2, str.length);
  }

  return result;
}

function createHexString(arr) {
  var result = "";
  for (var i in arr) {
    var str = arr[i].toString(16);
    str =
      str.length == 0
        ? "00"
        : str.length == 1
          ? "0" + str
          : str.length == 2
            ? str
            : str.substring(str.length - 2, str.length);
    result += str + " ";
  }
  return result;
}

function byteToUint8Array(byteArray) {
  var uint8Array = new Uint8Array(byteArray.length);
  for (var i = 0; i < uint8Array.length; i++) {
    uint8Array[i] = byteArray[i];
  }

  return uint8Array;
}

var device = null;
var server = null;
var service = null;
var rxCharacteristic = null;
var txCharacteristic = null;

function Send() {
  if (txCharacteristic == null) {
    return;
  }

  var senddata = parseHexString(
    document.getElementById("senddata").value.replaceAll(" ", "")
  );
  var crc = CRC16(senddata);
  senddata.push(crc[0]);
  senddata.push(crc[1]);
  txCharacteristic
    .writeValueWithoutResponse(byteToUint8Array(senddata))
    .then(() => {
      var table = document.getElementById("datatab");
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "out";
      cell2.innerHTML = createHexString(senddata);
    });
}



function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  for (let i = 0; i < value.byteLength; i++) {
    a.push(value.getUint8(i));
  }

  // var table = document.getElementById("datatab");
  // var row = table.insertRow(1);
  // var cell1 = row.insertCell(0);
  // var cell2 = row.insertCell(1);
  // cell1.innerHTML = "in_";
  // cell2.innerHTML = createHexString(a);

  console.log(a);
  if (cmd.length != 0) {
    Sender(cmd.shift())
  };
}

var is_connect = false;
var is_init = false;


function Connect() {
  console.log("Requesting Bluetooth Device...");
  navigator.bluetooth
    .requestDevice({
      filters: [{ name: "YXlinksSPP" }],
      optionalServices: ["0000ffb0-0000-1000-8000-00805f9b34fb"],
    })
    .then((newdevice) => {
      device = newdevice;
      console.log("Connecting to GATT Server...");
      return device.gatt.connect();
    })
    .then((newserver) => {
      server = newserver;
      console.log("Getting Service...");
      return server.getPrimaryService("0000ffb0-0000-1000-8000-00805f9b34fb");
    })
    .then((newservice) => {
      service = newservice;
      console.log("Getting Characteristic...");
      service
        .getCharacteristic("0000ffb2-0000-1000-8000-00805f9b34fb")
        .then((characteristic) => {
          rxCharacteristic = characteristic;
          return rxCharacteristic.startNotifications().then((_) => {
            console.log("> Notifications started");
            rxCharacteristic.addEventListener(
              "characteristicvaluechanged",
              handleNotifications
            );
          });
        });
      service
        .getCharacteristic("0000ffb1-0000-1000-8000-00805f9b34fb")
        .then((characteristic) => {
          txCharacteristic = characteristic;
        });
      is_connect = true;
      Sender(cmd.shift());
    })
    .catch((error) => {
      console.log("Argh! " + error);
      device = null;
      server = null;
      service = null;
      rxCharacteristic = null;
      txCharacteristic = null;
      // is_connect = false;
    });
}

function Test() {
  alert("222");
  if (txCharacteristic == null) {
    return;
  }

  var senddata = parseHexString("01 06 00 64 00 02".replaceAll(" ", ""));
  var crc = CRC16(senddata);
  senddata.push(crc[0]);
  senddata.push(crc[1]);
  txCharacteristic
    .writeValueWithoutResponse(byteToUint8Array(senddata))
    .then(() => {
      var table = document.getElementById("datatab");
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "out";
      cell2.innerHTML = createHexString(senddata);
    });
}

function Test2() {
  Sender("01 06 00 64 00 02");
  setTimeout(Sender, 1000, "01 06 00 A7 00 00");
  setTimeout(Sender, 2000, "01 06 00 A7 00 FF");
}

function Test3() {
  Sender("01 06 00 A7 00 FF");
}



function Test4() {
  // Добавить команды в очередь
  cmd.push("01 06 00 64 00 01");
  cmd.push("01 06 00 69 00 00");
  cmd.push("01 10 00 6b 00 05 0a 00 05 00 05 00 00 00 00 00 01");
  cmd.push("01 06 00 69 00 01");
  cmd.push("01 06 00 6a 00 01");
  // Выполнить первую команду
  // После ответа выполнится следующая команда из очереди
  Sender(cmd.shift());
}

function Pattern_mode() {
  if (is_connect == false) {
    cmd.unshift("01 06 00 64 00 00", "01 06 00 68 00 01");
    Connect();
  }
  else {
    Sender(cmd.shift());
  }
}

function Test5() {
  cmd.push("01 06 00 66 00 01"); //Speed down
  Pattern_mode();
}

function Test6() {
  cmd.push("01 06 00 66 00 02"); //Speed up
  Pattern_mode();
}

function Test7() {
  cmd.push("01 06 00 67 00 01"); //Range down
  Pattern_mode();
}

function Test8() {
  cmd.push("01 06 00 67 00 02"); //Range up
  Pattern_mode();
}


function Sender(str) {
  var senddata = parseHexString(str.replaceAll(" ", ""));
  var crc = CRC16(senddata);
  senddata.push(crc[0]);
  senddata.push(crc[1]);
  txCharacteristic
    .writeValueWithoutResponse(byteToUint8Array(senddata))
    .then(() => {
      // var table = document.getElementById("datatab");
      // var row = table.insertRow(1);
      // var cell1 = row.insertCell(0);
      // var cell2 = row.insertCell(1);
      // cell1.innerHTML = "out";
      // cell2.innerHTML = createHexString(senddata);
      console.log(createHexString(senddata));
    });
}
