import {Container} from "@mantine/core";

import classNames from "./styles.module.scss";

const Footer = () => {
    return (
        <Container size={1440} mt={"lg"}>
            <div className={classNames.footer}>
                <div className={classNames.middle}>
                    <div className={classNames.item}>
                        <div className={classNames.title}>THÔNG TIN</div>
                        <ul>
                            <li>
                                <a rel="nofollow" href="https://tailieu.vn/gioi-thieu.html">
                                    Về chúng tôi
                                </a>
                            </li>
                            <li>
                                <a
                                    rel="nofollow"
                                    href="https://tailieu.vn/tin-tuc.html?kind=quy-dinh-bao-mat"
                                >
                                    Quy định bảo mật
                                </a>
                            </li>
                            <li>
                                <a rel="nofollow" href="https://tailieu.vn/thoa-thuan-su-dung.html">
                                    Thỏa thuận sử dụng
                                </a>
                            </li>
                            <li>
                                <a target="_blank" rel="nofollow" href="quychetailieu.pdf">
                                    Quy chế hoạt động
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={classNames.item}>
                        <div className={classNames.title}>TRỢ GIÚP</div>
                        <ul>
                            <li>
                                <a
                                    rel="nofollow"
                                    href="https://tailieu.vn/tin-tuc.html?kind=huong-dan-su-dung"
                                >
                                    Hướng dẫn sử dụng
                                </a>
                            </li>
                            <li>
                                <a
                                    rel="nofollow"
                                    href="https://tailieu.vn/tin-tuc.html?kind=huong-dan-upload"
                                >
                                    Upload tài liệu
                                </a>
                            </li>
                            <li>
                                <a rel="nofollow" href="https://tailieu.vn/faq.html">
                                    Hỏi và đáp
                                </a>
                            </li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                    <div className={classNames.item}>
                        <div className={classNames.title}>HỖ TRỢ KHÁCH HÀNG</div>
                        <ul>
                            <li>
                                <a rel="nofollow" href="https://tailieu.vn/tin-tuc.html?kind=contact">
                                    Liên hệ
                                </a>
                            </li>
                            <li>
                                <a
                                    rel="nofollow"
                                    href="https://tailieu.vn/tin-tuc.html?kind=supportonline"
                                >
                                    Hỗ trợ trực tuyến
                                </a>
                            </li>
                            <li>
                                <a
                                    rel="nofollow"
                                    target="banggiatailieuvn"
                                    href="https://tailieu.vn/static/b2013az/RateCard_TaiLieuVN_2015.pdf?id=1"
                                >
                                    Liên hệ quảng cáo
                                </a>
                            </li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                    <div className={classNames.item}>
                        <div className={classNames.title}>Theo dõi chúng tôi</div>
                        <div>
                            <a
                                target="_blank"
                                rel="nofollow"
                                className="foloicon"
                                href="https://www.facebook.com/tailieu.vn"
                            >
                                <img
                                    src="https://tailieu.vn/static/b2013az/templates/version1/default/images/iconfb31x31.png"/>
                            </a>
                            <a
                                target="_blank"
                                rel="nofollow"
                                className="foloicon"
                                href="https://plus.google.com/112810534593309329301/"
                            >
                                <img
                                    src="https://tailieu.vn/static/b2013az/templates/version1/default/images/icongplus31x31.png"/>
                            </a>
                            <a
                                target="_blank"
                                rel="nofollow"
                                className="foloicon"
                                href="https://www.linkedin.com/company/tailieu.vn"
                            >
                                <img
                                    src="https://tailieu.vn/static/b2013az/templates/version1/default/images/iconin31x31.png"/>
                            </a>
                        </div>
                    </div>
                    <div style={{width: 500, float: "left", marginTop: 10}}>
                        <p style={{marginBottom: 10}}>
                            <b>Chịu trách nhiệm nội dung:</b>
                        </p>
                        <p>Nguyễn Công Hà - Giám đốc Công ty TNHH TÀI LIỆU TRỰC TUYẾN VI NA</p>
                    </div>
                    <div style={{width: 500, float: "left"}}>
                        <p style={{marginBottom: 10}}>
                            <b>LIÊN HỆ</b>
                        </p>
                        <p style={{marginBottom: 10}}>
                            Địa chỉ: P402, 54A Nơ Trang Long, Phường 14, Q.Bình Thạnh, TP.HCM
                        </p>
                        <p style={{marginBottom: 10}}>Hotline: 093 303 0098</p>
                        <p>
                            Email: <a href="mailto:support@tailieu.vn">support@tailieu.vn</a>
                        </p>
                    </div>
                </div>
                <div
                    className="bottom fleft"
                    style={{
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                    }}
                >
                    <p className="fleft">
                        <a
                            rel="nofollow"
                            href="https://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=18118"
                        >
                            <img alt="" title="" src="/images/credit.jpgx"/>
                        </a>
                    </p>
                    <p
                        className="copyright"
                    >
                        Giấy phép Mạng Xã Hội số: 670/GP-BTTTT cấp ngày 30/11/2015 Copyright ©
                        2022-2032 TaiLieu.VN. All rights reserved.
                    </p>
                </div>
            </div>
        </Container>

    );
};

export default Footer;