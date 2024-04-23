import UserService from "./services/user.service.js";

async function startApp() {
  await UserService.start();

  try {
    const newUser = await UserService.call("users.create", {
      user: {
        username: "Sample user",
        email: "umair@gmail.com",
        password: "abcd1234",
      },
    });
    console.log("New user created", newUser);

    // Get the newly created user
    const user = await UserService.call("users.get", {
      id: newUser._id.toString(),
    });
    console.log("User Retrieved:", user);

    // Update the newly created user
    const updateduser = await UserService.call("users.update", {
      id: newUser._id.toString(),
      user: {
        username: "umairmirza", // changing the price
      },
    });
    console.log("User Updated:", updateduser);

    // Remove the user
    const removeduser = await UserService.call("users.remove", {
      id: newUser._id.toString(),
    });
    console.log("user Removed:", removeduser);

    // List all users to verify deletion
    const users = await UserService.call("users.list");
    console.log("users: ", users);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await UserService.stop();
  }
}

startApp();
