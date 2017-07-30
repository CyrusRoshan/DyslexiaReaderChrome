type chrome;

external chrome : chrome = "chrome" [@@bs.val];

module Storage = {
  type storage;
  external storage : chrome => storage = "storage" [@@bs.get];
  module Sync = {
    type sync;
    external sync : storage => sync = "sync" [@@bs.get];
    external set : sync => 'a => (unit => unit) => unit = "set" [@@bs.send];
    external get : sync => 'a => (unit => unit) => 'b = "get" [@@bs.send];
  };
};

module Tabs = {
  type tabs;
  external tabs : chrome => tabs = "tabs" [@@bs.get];
  type executableScript;
  external setExecutableScript : executableScript => 'a => 'b => unit = "" [@@bs.set_index];
  let makeExecutableScript e s => setExecutableScript e "code" s;
  external executeScript : tabs => executableScript => unit = "executeScript" [@@bs.send];
};

type capsule;

external setCapsule : capsule => 'a => 'b => unit = "" [@@bs.set_index];

let store key x => {
  let newCapsule: capsule = [%bs.raw "{}"];
  setCapsule newCapsule key x;
  let set' = Storage.Sync.set (Storage.Sync.sync (Storage.storage chrome));
  set' newCapsule (fun () => Js.log2 "Stored in Extension Sync: " x)
};

let retrieve key => {
  let get' = Storage.Sync.get (Storage.Sync.sync (Storage.storage chrome));
  get' key (fun _ => ())
};
