import React, { useState } from 'react'
import { HeroSection, InfoProduct, InfoProductDiv, MainImage, OrderDiv, Wrapper } from './style'
import Discover from '../../assets/images/discover.jpg'
import { CaretDownOutlined } from '@ant-design/icons'

const DiscoverShoePage = () => {
  const [isOpenCollar,setIsOpenCollar] = useState(false)
  const [isOpenPadding,setIsOpenPadding] = useState(false)
  const [isOpenFoxing,setIsOpenFoxing] = useState(false)
  const [isOpenOutsole,setIsOpenOutsole] = useState(false)
  const [isOpenUpper,setIsOpenUpper] = useState(false)

  
  return (
    <Wrapper>
        <HeroSection style={{ padding: '0', position: 'relative', background: 'rgba(255, 255, 255, 0.8)' }}>
        <MainImage 
          style={{ 
            width: '90%', 
            height: 'auto', 
            borderRadius: '2px' 
          }} 
          src={Discover} 
          alt="discover image" 
        />
        </HeroSection>

        <OrderDiv>
          <div style={{ fontSize: '25px', fontWeight: '600'}}>CHI TIẾT BỘ PHẬN GIÀY</div>
          <InfoProductDiv >
            <div>
              <InfoProduct onClick={() =>{setIsOpenCollar(prevState => !prevState)}} style={{ cursor: 'pointer'}}> 
                  Collar (Cổ giày)
                  <CaretDownOutlined />
              </InfoProduct>
              {isOpenCollar && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                Chất liệu:<br/>
                Collar thường được làm từ vải mềm, da, hoặc các chất liệu tổng hợp. Để tăng sự thoải mái, phần này thường có lớp đệm bằng bọt xốp (foam) hoặc vật liệu cao su mềm.
                <br/><br/>
                Công dụng:<br/>
                Collar giúp cố định cổ chân, bảo vệ vùng mắt cá khỏi ma sát với giày và giảm áp lực lên chân. Trong các loại giày thể thao, collar còn giúp tăng độ vừa vặn và hỗ trợ khi vận động mạnh.
                <br/><br/>
                Quy trình sản xuất:<br/>
                Collar được tạo từ chất liệu chính (vải hoặc da), được cắt thành hình dáng phù hợp. Phần đệm (foam) được chèn vào bên trong, sau đó collar được may hoặc dán vào phần thân giày.
                <br/><br/>
                Kiểm tra:<br/>
                Kiểm tra độ đàn hồi của lớp đệm, độ bền của đường may và khả năng chống ma sát. Collar cần vừa đủ mềm để thoải mái nhưng vẫn chắc chắn để giữ cố định cổ chân.
                <br/><br/>
                Vệ sinh:<br/>
                Với collar bằng vải, có thể dùng bàn chải mềm để làm sạch bụi bẩn. Đối với da, dùng khăn ẩm lau nhẹ và tránh sử dụng hóa chất mạnh.
                <br/><br/>
                </div>}
            </div>

            <div>
              <InfoProduct onClick={() =>{setIsOpenPadding(prevState => !prevState)}} style={{ cursor: 'pointer'}}> 
                  Padding (Lớp đệm)
                  <CaretDownOutlined />
              </InfoProduct>
              {isOpenPadding && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                Chất liệu:<br/>
                Lớp đệm thường được làm từ mút bọt biển (foam), gel hoặc vật liệu tổng hợp có độ đàn hồi cao. Một số loại giày cao cấp còn sử dụng memory foam để tăng cường sự thoải mái.
                <br/><br/>
                Công dụng:<br/>
                Padding cung cấp sự êm ái và bảo vệ bàn chân khỏi va chạm và áp lực từ giày. Phần đệm này thường được dùng quanh cổ giày, bên trong thân giày và gót chân.
                <br/><br/>
                Quy trình sản xuất:<br/>
                Chất liệu đệm được ép hoặc cắt thành từng tấm nhỏ, sau đó được chèn vào giữa các lớp vải hoặc da trong quá trình may giày.
                <br/><br/>
                Kiểm tra:<br/>
                Đệm được kiểm tra về độ đàn hồi, độ bền khi chịu áp lực và khả năng giữ được hình dạng sau thời gian sử dụng.
                <br/><br/>
                Vệ sinh:<br/>
                Đệm không trực tiếp tiếp xúc với bụi bẩn nhưng có thể bị ẩm. Lau sạch bằng khăn ẩm và phơi khô tự nhiên, tránh ánh nắng trực tiếp.
                <br/><br/>                
                </div>}
            </div>

            <div>
              <InfoProduct onClick={() =>{setIsOpenFoxing(prevState => !prevState)}} style={{ cursor: 'pointer'}}> 
                  Foxing (Viền giày)
                  <CaretDownOutlined />
              </InfoProduct>
              {isOpenFoxing && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                Chất liệu:<br/>
                Viền giày thường được làm từ cao su hoặc vật liệu tổng hợp như PVC, có độ bền cao và khả năng chống mài mòn tốt.
                <br/><br/>
                Công dụng:<br/>
                Foxing tăng độ bền cho giày bằng cách bảo vệ phần tiếp xúc giữa thân giày và đế giày. Ngoài ra, nó còn là điểm nhấn thẩm mỹ, đặc biệt trong các dòng giày thể thao hoặc giày canvas.
                <br/><br/>
                Quy trình sản xuất:<br/>
                Phần viền được đúc từ cao su hoặc vật liệu tương tự, sau đó được dán hoặc ép nhiệt vào giày. Một số loại foxing còn được sơn hoặc in hoa văn để tạo điểm nhấn.
                <br/><br/>
                Kiểm tra:<br/>
                Kiểm tra độ bám dính của foxing với giày, khả năng chống mài mòn và tính thẩm mỹ (không nứt, không bong).
                <br/><br/>
                Vệ sinh:<br/>
                Lau sạch viền giày bằng khăn ẩm hoặc bàn chải mềm. Với cao su trắng, có thể dùng dung dịch baking soda hoặc kem đánh răng để làm sạch các vết ố.
                <br/><br/>              
              </div>}
            </div>

            <div>
              <InfoProduct onClick={() =>{setIsOpenOutsole(prevState => !prevState)}} style={{ cursor: 'pointer'}}> 
                  Outsole (Đế ngoài)
                  <CaretDownOutlined />
              </InfoProduct>
              {isOpenOutsole && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                  Chất liệu:<br/>
                  Outsole thường làm từ cao su tự nhiên hoặc tổng hợp, polyurethane (PU), hoặc thermoplastic rubber (TPR). Một số đế giày chuyên dụng dùng các hợp chất cao cấp để tăng độ bám và chống trơn trượt.
                  <br/><br/>
                  Công dụng:<br/>
                  Đế ngoài cung cấp độ bám, bảo vệ giày khỏi mài mòn và hỗ trợ ổn định khi di chuyển. Các hoa văn trên đế giúp tăng độ ma sát và giảm nguy cơ trượt ngã.
                  <br/><br/>
                  Quy trình sản xuất:<br/>
                  Outsole được đúc hoặc ép khuôn theo hình dạng và hoa văn mong muốn. Sau đó, nó được dán hoặc ép nhiệt vào phần thân giày trong giai đoạn lắp ráp cuối cùng.
                  <br/><br/>
                  Kiểm tra:<br/>
                  Đế ngoài phải chịu các bài kiểm tra về độ bám trên các bề mặt khác nhau, khả năng chống mài mòn, và độ bền khi chịu lực.
                  <br/><br/>
                  Vệ sinh:<br/>
                  Dùng bàn chải để làm sạch bụi và mảnh vụn trên đế. Có thể sử dụng xà phòng nhẹ để cọ rửa những vết bẩn cứng đầu.
                  <br/><br/>                
                </div>}
            </div>

            <div>
              <InfoProduct onClick={() =>{setIsOpenUpper(prevState => !prevState)}} style={{ cursor: 'pointer'}}> 
                  Upper (Thân giày)
                  <CaretDownOutlined />
              </InfoProduct>
              {isOpenUpper && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                  Chất liệu:<br/>
                  Upper có thể làm từ da tự nhiên, vải lưới (mesh), canvas, hoặc vật liệu tổng hợp. Các chất liệu cao cấp hơn như Gore-Tex được dùng trong giày chống thấm nước.
                  <br/><br/>
                  Công dụng:<br/>
                  Thân giày bảo vệ bàn chân và tạo hình dáng tổng thể cho giày. Nó quyết định độ vừa vặn, thoáng khí và tính thẩm mỹ của giày.
                  <br/><br/>
                  Quy trình sản xuất:<br/>
                  Chất liệu được cắt theo mẫu thiết kế, sau đó được may hoặc dán lại để tạo thành thân giày. Một số loại upper còn được gia cố bằng lớp phủ chống nước hoặc lớp lưới thoáng khí.
                  <br/><br/>
                  Kiểm tra:<br/>
                  Upper được kiểm tra về độ bền của chất liệu, khả năng chống rách và tính thoáng khí. Đường may và độ kết dính cũng được kiểm tra kỹ lưỡng để đảm bảo chất lượng.
                  <br/><br/>
                  Vệ sinh:<br/>
                  Với giày da, dùng khăn mềm và dung dịch chăm sóc da. Với vải hoặc lưới, dùng bàn chải mềm và xà phòng loãng để vệ sinh. Phơi khô tự nhiên, tránh máy sấy hoặc ánh nắng trực tiếp.
                  <br/><br/>                  
                </div>}
            </div>
          </InfoProductDiv>
        </OrderDiv>
    </Wrapper>
  )
}

export default DiscoverShoePage
