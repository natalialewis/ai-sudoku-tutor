import { redirect } from "next/navigation";
import { getUser } from "./auth";

jest.mock("@/lib/supabase/server", () => ({
  createSupabaseClient: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const mockCreateSupabaseClient =
  require("@/lib/supabase/server").createSupabaseClient;

describe("getUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when user is not authenticated", async () => {
    mockCreateSupabaseClient.mockResolvedValue({
      auth: {
        getUser: () => Promise.resolve({ data: { user: null } }),
      },
    });

    const result = await getUser();

    expect(redirect).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("returns the user when authenticated", async () => {
    const mockUser = {
      id: "user-123",
      email: "test@example.com",
    };
    mockCreateSupabaseClient.mockResolvedValue({
      auth: {
        getUser: () => Promise.resolve({ data: { user: mockUser } }),
      },
    });

    const result = await getUser();

    expect(redirect).not.toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });
});
