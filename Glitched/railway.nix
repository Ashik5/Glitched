{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/8ac1c1c.tar.gz") { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.php80
    pkgs.composer
    pkgs.nodejs
    pkgs.mysql
  ];
}
