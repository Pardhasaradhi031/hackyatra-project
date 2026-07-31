import bcrypt from "bcrypt";

async function main() {
  const hash =
    "$2b$10$D4AgbmVhw278kYR0qKTOEemKycLq3RkkAFVHkR60/EEwjVWjQdoYa";

  console.log(await bcrypt.compare("admin123", hash));
}

main();