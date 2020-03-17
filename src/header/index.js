import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    Addition, Button, SearchInfoList,
    HeaderWrapper, Logo, Nav, SearchWrapper,
    NavItem, NavSearch, SearchInfo,
    SearchInfoTitle, SearchInfoSwitch, SearchInfoItem
} from './style';
import {CSSTransition} from 'react-transition-group';
import {
    handleInputBlur,
    handleInputFocus,
    getSearchList,
    handleMouseEnter,
    handleMouseLeave,
    handleChangePage
} from "../action";


class Header extends Component {

    getListArea() {
        const {focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
        const newList = list.toJS();
        const pageList = [];
        if (newList.length > 0) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                            换一换
                            <i ref={(icon) => {
                                this.spinIcon = icon
                            }} className='iconfont spin'>&#xe851;</i>
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null;
        }
    }

    render() {
        const {focused, handleInputFocus, handleInputBlur, list} = this.props;
        return (
            <HeaderWrapper>
                <Logo href='/'></Logo>
                <Nav>
                    <NavItem className='left'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <div style={{marginRight:'50px'}}>
                        <NavItem className='right'>登录</NavItem>
                        <NavItem className='right'>
                            <i className="iconfont">&#xe636;</i>
                        </NavItem>
                    </div>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={500}
                            classNames="slide"
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={() => handleInputFocus(list)}
                                onBlur={handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe62b;</i>
                    </SearchWrapper>
                    {this.getListArea()}
                </Nav>
                <Addition>
                    <Button className='writing'>
                        <i className="iconfont">&#xe615;</i>
                        写文章</Button>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.get('header').get('focused'),
        list: state.get('header').get('list'),
        page: state.get('header').get('page'),
        mouseIn: state.get('header').get('mouseIn'),
        totalPage: state.get('header').get('totalPage')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            (list.size === 0) && dispatch(getSearchList());
            dispatch(handleInputFocus());
        },
        handleInputBlur() {
            dispatch(handleInputBlur());
        },
        handleMouseEnter() {
            dispatch(handleMouseEnter());
        },
        handleMouseLeave() {
            dispatch(handleMouseLeave());
        },
        handleChangePage(page, totalPage, spin) {
            spin.style.transform = 'rotate(360deg)';
            console.log(totalPage, page);
            if (page < totalPage) {
                dispatch(handleChangePage(page + 1));
            } else if (page === totalPage) {
                page = 1;
                dispatch(handleChangePage(page));
            } else {
                dispatch(handleChangePage(page));
            }

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);