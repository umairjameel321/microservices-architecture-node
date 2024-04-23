import { ServiceBroker } from "moleculer";
import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import user from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const broker = new ServiceBroker();

broker.createService({
  name: "users",
  mixins: [DbService],
  adapter: new MongooseAdapter(process.env.MONGODB_URL, options),
  model: user,
  actions: {
    async list() {
      return await this.adapter.find();
    },
    get: {
      params: {
        id: { type: "string" },
      },
      async handler(ctx) {
        return await this.adapter.findById(ctx.params.id);
      },
    },
    // Action to create a new user
    async create(ctx) {
      return await this.adapter.insert(ctx.params.user);
    },
    // Action to update a user by ID
    async update(ctx) {
      return await this.adapter.updateById(ctx.params.id, {
        $set: ctx.params.user,
      });
    },
    // Action to delete a user by ID
    async remove(ctx) {
      return await this.adapter.removeById(ctx.params.id);
    },
  },
});

export default broker;
