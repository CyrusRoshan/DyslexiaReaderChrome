type chrome;

external chrome : chrome = "chrome" [@@bs.val];

module Runtime = {
  type runtime;
  external sendMessage : runtime => 'a => ('b => 'c) => unit = "sendMessage" [@@bs.send];
  module On_message = {
    type onMessage;
    external addListener : onMessage => ('a => 'b => 'c => 'd) => unit = "addListener" [@@bs.send];
  };
  external onMessage : runtime => On_message.onMessage = "onMessage" [@@bs.get];
};

external runtime : chrome => Runtime.runtime = "runtime" [@@bs.get];

module Storage = {
  type storage;
  module Sync = {
    type sync;
    external sync : storage => sync = "sync" [@@bs.get];
    external set : sync => 'a => (unit => unit) => unit = "set" [@@bs.send];
    external get : sync => 'a => ('b => 'c) => option 'd =
      "get" [@@bs.send] [@@bs.return null_to_opt] [@@bs.return undefined_to_opt];
  };
};

external storage : chrome => Storage.storage = "storage" [@@bs.get];

module Tabs = {
  type tabs;
  type executableScript;
  external setExecutableScript : executableScript => 'a => 'b => unit = "" [@@bs.set_index];
  let makeExecutableScript e s => setExecutableScript e "code" s;
  external executeScript : tabs => executableScript => unit = "executeScript" [@@bs.send];
};

external tabs : chrome => Tabs.tabs = "tabs" [@@bs.get];

type capsule;

external setCapsule : capsule => 'a => 'b => unit = "" [@@bs.set_index];

let store key x => {
  let newCapsule: capsule = [%bs.raw "{}"];
  setCapsule newCapsule key x;
  Js.log2 "Capsule to save:" newCapsule;
  let set' = Storage.Sync.set (Storage.Sync.sync (storage chrome));
  set' newCapsule (fun () => Js.log2 "Stored in Extension Sync: " x)
};

external getCapsule : capsule => 'a => 'b = "" [@@bs.get_index];

let retrieve key callback => {
  let get' = Storage.Sync.get (Storage.Sync.sync (storage chrome));
  get' key (fun x => callback (getCapsule x key))
};
