import Service from "./service.js";

const user = {
  username: 'alexandrebekor',
  password: '123456'
}

const service = new Service({
  filename: 'users.ndjson'
})

await service.write(user)
const users = await service.read()

console.log({ users })