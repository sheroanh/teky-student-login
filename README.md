# TEKY Student Login
Phần mở rộng với chức năng hỗ trợ đăng nhập LMS Học viên qua QR code cho cộng đồng giảng viên TEKY
## Yêu cầu
Phần mở rộng tương thích hầu hết các trình duyệt nhân Chromium: Microsoft Edge (đã kiểm thử), Google Chrome
## Cài đặt
1. Tải mã nguồn về máy và giải nén (nếu có)
2. Mở cài đặt Tiện ích mở rộng trên trình duyệt
3. Mở chế độ cho Nhà Phát triển (Developer mode) nếu chưa mở
4. Chọn Tải tiện ích đã giải nén (Load unpacked) > Chọn thư mục đã giải nén ở bước 1.
5. Ghim phần mở rộng lên thanh công cụ (Hiển thị Logo TEKY lên thanh công cụ)
## Sử dụng
1. Nhấn vào Logo TEKY ở trên thanh công cụ
2. Tuỳ chọn các tính năng (nếu có)
3. Nhấn nút QR Login để chuyển hướng đến trang đăng nhập
## Nhật ký phiên bản
Phiên bản 1.0: 
- Hỗ trợ (bật/tắt) tính năng năng đăng xuất khi đăng nhập QR Code
Phiên bản 1.1:
- Hỗ trợ (bật/tắt) tính năng chuyển tiếp sau khi đăng nhập thành công
- Hỗ trợ tính năng chọn trang chuyển tiếp sau khi đăng nhập thành công
## FAQ
1. Tại sao phần mở rộng lại không xuất bản lên Cửa hàng Chrome trực tuyến hay các cửa hàng cung cấp phần mở rộng? Công nghệ phát triển phần mở rộng là gì?
- Phần mở rộng hướng đến phạm vi nhỏ, là cộng đồng giảng viên làm việc tại TEKY. Ngoài ra, khi xuất bản lên Cửa hàng Chrome trực tuyến cũng mất một khoản phí nhỏ.
- Xây dựng bằng HTML, CSS, JavaScript và sử dụng Chrome API được cung cấp sẵn từ Google.
2. Tại sao chỉ phát triển theo hướng hỗ trợ đăng nhập bằng QR Code?
- Việc đăng nhập bằng QR Code thuận tiện hơn so với đăng nhập bằng tài khoản. Tài khoản LMS của mỗi học viên có mật khẩu khác nhau. Giả sử đã có danh sách tài khoản LMS học viên thì cũng phải thường xuyên kiểm tra mật khẩu.
3. Tôi muốn nhân bản/tham khảo và cải tiến dự án có được không; Có thể sử dụng, chia sẻ đến các giảng viên khác hay không?
- Em rất hoan nghênh quý thầy cô cải tiến, chia sẻ sản phẩm để phục vụ cộng đồng giảng viên. Tuy nhiên, quý thầy cô vui lòng trích nguồn dự án nếu có nhân bản/xuất bản lên các cửa hàng.
4. Chưa kịp quét mã QR Code thì trình duyệt tự vào tài khoản LMS khác thì xử lý thế nào?
- Vấn đề này xuất phát từ hệ thống LMS. Quý thầy cô có thể mở ứng dụng Tutoro và chọn sẵn HV cần quét mã rồi nhấn nút QR Login.
5. Không cài đặt được phần mở rộng? Không thể sử dụng phần mở rộng?
- Quý thầy cô vui lòng chọn đúng thư mục mã nguồn và nhấn vào nút Chọn thư mục (Select folder).
- Phần mở rộng tương thích hầu hết với trình duyệt nhân Chromium. Hãy kiểm tra lại trình duyệt thầy cô đang dùng.
