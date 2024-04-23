import { ServiceBroker } from "moleculer";
import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import product from "../models/product.js";

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const options = {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
  useFindAndModify: false,
};

// Create a service broker
const broker = new ServiceBroker();

broker.createService({
  name: "products",
  mixins: [DbService],
  adapter: new MongooseAdapter(process.env.MONGODB_URL, options),
  model: product,
  actions: {
    // Action to list all products
    async list() {
      return await this.adapter.find();
    },
    // Action to get a single product by ID
    get: {
      params: {
        id: { type: "string" },
      },
      async handler(ctx) {
        return await this.adapter.findById(ctx.params.id);
      },
    },
    // Action to create a new product
    async create(ctx) {
      return await this.adapter.insert(ctx.params.product);
    },
    // Action to update a product by ID
    async update(ctx) {
      return await this.adapter.updateById(ctx.params.id, {
        $set: ctx.params.product,
      });
    },
    // Action to delete a product by ID
    async remove(ctx) {
      return await this.adapter.removeById(ctx.params.id);
    },
  },
});

export default broker;
