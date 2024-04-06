import {Footer} from '@/components';
import {login, register} from '@/services/ant-design-pro/api';
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {Helmet, history, useModel} from '@umijs/max';
import {Alert, Tabs, message} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {GITHUB_LINK, SYSTEM_LOGO} from "@/constant";

const useStyles = createStyles(({token}) => {
    return {
        action: {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        },
        lang: {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        },
    };
});

const Lang = () => {
    const {styles} = useStyles();
    return;
};
const LoginMessage: React.FC<{
    content: string;
}> = ({content}) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};
let buttonStr = '登录'
const Login: React.FC = () => {
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const {initialState, setInitialState} = useModel('@@initialState');
    const {styles} = useStyles();
    const handlerChange = (val: string) => {
        if (val === 'register') {
            buttonStr = '注册'

        }
        if (val === 'account') {
            buttonStr = '登录'
        }
        setType(val)
        return type;
    };
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };
    //注册功能
    const handleregister = async (values: API.RegisterParams) => {
        // 前端先校验，再后端请求
        const {userPassword,checkPassword} = values
        if(userPassword !== checkPassword){
            message.error('两次密码不一致');
            return;
        }
        try {
            const userId = await register({...values});
            if (userId > 0) {
                message.success('注册成功');
                setType('account')
            } else {
                throw new Error(`register error id = ${userId}`)
            }
        } catch (error) {
            message.error('注册失败请重试');
        }

    }
    const handleSubmit = async (values: API.LoginParams) => {
        try {
            // 登录
            const msg = await login({
                ...values,
                type,
            });
            if (msg) {
                const defaultLoginSuccessMessage = '登录成功！';
                message.success(defaultLoginSuccessMessage);
                await fetchUserInfo();
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                return;
            }
            console.log(msg);
            // 如果失败去设置用户错误信息
            setUserLoginState(msg);
        } catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };
    const {status, type: loginType} = userLoginState;
    return (
        <div className={styles.container}>
            <Helmet>
                <title>
                    {'登录/注册'}- {Settings.title}
                </title>
            </Helmet>
            <Lang/>
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                }}
            >
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src={SYSTEM_LOGO}/>}
                    submitter={{searchConfig: {submitText: buttonStr}}}
                    title="BOSC CENTER"
                    subTitle={'hailong出品，必属精品'}
                    initialValues={{
                        autoLogin: true,
                    }}

                    onFinish={async (values) => {
                        if (type === 'register') {
                            await handleregister(values as API.RegisterParams);
                        } else {
                            // 登录
                            await handleSubmit(values as API.LoginParams);
                        }
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={handlerChange}
                        centered
                        items={[
                            {
                                key: 'account',
                                label: '账户密码登录',
                            },
                            {
                                key: 'register',
                                label: '用户注册'
                            }
                        ]}
                    />

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage content={'错误的用户名和密码(admin/ant.design)'}/>
                    )}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined onPointerEnterCapture={undefined}
                                                          onPointerLeaveCapture={undefined}/>,
                                }}
                                placeholder={'请输入账号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '账号是必填项！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined onPointerEnterCapture={undefined}
                                                          onPointerLeaveCapture={undefined}/>,
                                }}
                                placeholder={'密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        type: 'string',
                                        message: '密码长度最小为8'
                                    }
                                ]}
                            />
                            <div
                                style={{
                                    marginBottom: 24,
                                }}
                            >
                                <ProFormCheckbox noStyle name="autoLogin">
                                    自动登录
                                </ProFormCheckbox>
                                <a
                                    style={{
                                        float: 'right',
                                    }}
                                    href={GITHUB_LINK}
                                    target="_blank"
                                >
                                    忘记密码，请联系管理员
                                </a>
                            </div>
                        </>

                    )}
                    {type === 'register' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined onPointerEnterCapture={undefined}
                                                          onPointerLeaveCapture={undefined}/>,
                                }}
                                placeholder={'请输入账号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '账号是必填项！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined onPointerEnterCapture={undefined}
                                                          onPointerLeaveCapture={undefined}/>,
                                }}
                                placeholder={'密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        type: 'string',
                                        message: '密码长度最小为8'
                                    }
                                ]}
                            />
                            <ProFormText.Password
                                name="checkPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined onPointerEnterCapture={undefined}
                                                          onPointerLeaveCapture={undefined}/>,
                                }}
                                placeholder={'请确认密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        type: 'string',
                                        message: '密码长度最小为8'
                                    }
                                ]}
                            />
                        </>
                    )}
                </LoginForm>
            </div>
            <Footer/>
        </div>
    );
};
export default Login;
