const AuthService = require("../service/AuthService"); 

describe("AuthService", () => {
  let authService;
  let mockRepository;
  let mockJwtUtils;

  beforeEach(() => {
    mockRepository = {
      register: jest.fn(),
      findUserByEmail: jest.fn(),
    };
    mockJwtUtils = {
      signToken: jest.fn(),
    };
    authService = new AuthService(mockRepository, mockJwtUtils);
  });

  test("register() should call repository.register and return result", async () => {
    const userData = { email: "test@example.com", password: "password" };
    mockRepository.register.mockResolvedValue(userData);

    const result = await authService.register(userData);
    expect(mockRepository.register).toHaveBeenCalledWith(userData);
    expect(result).toEqual(userData);
  });

  test("register() should throw AppError on failure", async () => {
    mockRepository.register.mockRejectedValue(new Error());

    await expect(authService.register({})).rejects.toThrow(
      "Failed to register"
    );
  });

  test("login() should return user when credentials are valid", async () => {
    const mockUser = { verifyPassword: jest.fn().mockResolvedValue(true) };
    mockRepository.findUserByEmail.mockResolvedValue(mockUser);

    const result = await authService.login("test@example.com", "password");
    expect(mockRepository.findUserByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(result).toBe(mockUser);
  });

  test("login() should throw AppError when user is not found", async () => {
    mockRepository.findUserByEmail.mockResolvedValue(null);

    await expect(
      authService.login("test@example.com", "password")
    ).rejects.toThrow("User not found");
  });

  test("login() should throw AppError when password is incorrect", async () => {
    const mockUser = { verifyPassword: jest.fn().mockResolvedValue(false) };
    mockRepository.findUserByEmail.mockResolvedValue(mockUser);

    await expect(
      authService.login("test@example.com", "wrongpassword")
    ).rejects.toThrow("Invalid credentials");
  });

  test("sendJwtToken() should set cookie and return response", () => {
    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const user = { _id: "123", password: "hidden" };

    mockJwtUtils.signToken.mockReturnValue("mockToken");
    authService.sendJwtToken(user, 200, res);

    expect(res.cookie).toHaveBeenCalledWith(
      "jwt",
      "mockToken",
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: "mockToken",
      user: { _id: "123", password: undefined },
    });
  });
});
