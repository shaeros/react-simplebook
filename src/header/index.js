import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    Addition, Button, SearchInfoList,
    HeaderWrapper, Logo, Nav,
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
        const {focused, list, page, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
        const newList = list.toJS();
        const pageList = [];
        if (newList.length > 0) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        if (focused) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>换一换</SearchInfoSwitch>
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
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <CSSTransition
                        in={focused}
                        timeout={200}
                        classNames="slide"
                    >
                        <NavSearch
                            className={focused ? 'focused' : ''}
                            onFocus={() => handleInputFocus(list)}
                            onBlur={handleInputBlur}
                        >
                        </NavSearch>
                    </CSSTransition>
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
        totalPage: state.get('header').get('page')
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
        handleChangePage(page, totalPage) {
            if (page < totalPage) {
                dispatch(handleChangePage(page + 1));
            } else {
                dispatch(handleChangePage(page));
            }

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);