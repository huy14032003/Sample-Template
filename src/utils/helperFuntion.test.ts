import { removeRefreshTokenCookie } from "./helperFuntion"
import Cookies from 'js-cookie'
import { CookieKey } from "@/types/fetchBaseQuery.type"

// describe('sum()', () => {
//   it('should add two positive numbers', () => {
//     expect(sum(1, 2)).toBe(3);
//   });

//   it('should handle negative numbers', () => {
//     expect(sum(-1, -2)).toBe(-3);
//   });

//   it('should handle zero', () => {
//     expect(sum(0, 5)).toBe(5);
//   });
// });


// Mock thư viện js-cookie
vi.mock('js-cookie', () => ({
  default: {
    remove: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
  }
}))

describe("removeRefreshTokenCookie", () => {
  // Reset mock trước mỗi test
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("should call Cookies.remove with correct parameters", () => {
    // Gọi hàm cần test
    removeRefreshTokenCookie()
    
    // Kiểm tra Cookies.remove được gọi đúng tham số
    expect(Cookies.remove).toHaveBeenCalledWith(
      CookieKey.REFRESH_TOKEN, 
      { path: '/' }
    )
  })
  it("should call Cookies.remove exactly once", () => {
    removeRefreshTokenCookie()
    
    expect(Cookies.remove).toHaveBeenCalledTimes(1)
  })
})