import ProductService from "./services/products.service.js";

async function startApp() {
  await ProductService.start();

  try {
    // Create a new product
    const newProduct = await ProductService.call("products.create", {
      product: {
        name: "Sample Product",
        price: 19.99,
        category: "General",
      },
    });
    console.log("New Product Created:", newProduct);

    // Get the newly created product
    const product = await ProductService.call("products.get", {
      id: newProduct._id.toString(),
    });
    console.log("Product Retrieved:", product);

    // Update the newly created product
    const updatedProduct = await ProductService.call("products.update", {
      id: newProduct._id.toString(),
      product: {
        price: 29.99, // changing the price
      },
    });
    console.log("Product Updated:", updatedProduct);

    // Remove the product
    const removedProduct = await ProductService.call("products.remove", {
      id: newProduct._id.toString(),
    });
    console.log("Product Removed:", removedProduct);

    // List all products to verify deletion
    const products = await ProductService.call("products.list");
    console.log("Products: ", products);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await ProductService.stop();
  }
}

startApp();
