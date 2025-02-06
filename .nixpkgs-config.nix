{ pkgs }: {
  packageOverrides = pkgs: {
    php = pkgs.php80.overrideAttrs (oldAttrs: {
      version = "8.0.3";
    });
  };
}
