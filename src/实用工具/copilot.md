---
# 这是文章的标题
title: GitHub Copilot 使用指南
# 你可以自定义封面图片
# 这是页面的图标
icon: code
# 这是侧边栏的顺序
order: 2
# 设置作者
cover: "https://cloud.tsinghua.edu.cn/f/014b399822a84ba5a684/?dl=1"
author: ai-coding
# 设置写作时间
date: 2025-9-19
# 一个页面可以有多个分类
category:
   - 编程工具
# 一个页面可以有多个标签
tag:
   - AI
   - GitHub
   - Copilot
# 此页面会在文章列表置顶
# 此页面会出现在星标文章中
star: false
---
# github copilot
<div align="center">
   <img src="https://cloud.tsinghua.edu.cn/f/9f1f76c21f1a4b99b11c/?dl=1" alt="想要体验各种最新模型？">
   <p>想要体验各种最新模型？</p>
   <img src="https://cloud.tsinghua.edu.cn/f/5ebd11963c4a432db045/?dl=1" alt="想要更集成的ai coding体验？">
   <p>想要更集成的ai coding体验？</p>
   <img src="https://cloud.tsinghua.edu.cn/f/962377f286c848f7aab6/?dl=1" alt="更方便的对话窗口&代码补全">
   <p>更方便的对话窗口&代码补全</p>
</div>

那就来看看 ~~并白嫖~~ **GitHub Copilot** 吧！

:::note
在通过 github 教育认证后，可以免费使用 10 刀每月的 copilot pro 订阅+4 刀每月的 github pro 订阅（为期两年，两年学生认证到期后可重新认证续期）
:::

## 1.准备工作
首先用**学生邮箱**注册一个 github 账号（已经有 github 号的同学可以添加学生邮箱，并设置成首选）
然后将个人主页按下图模板设置好：
![公开档案](https://cloud.tsinghua.edu.cn/f/00c752a6701241b3a6f1/?dl=1)
![支付信息](https://cloud.tsinghua.edu.cn/f/fecb151fb46b40848469/?dl=1)
然后需要设置双重验证，在手机上下载 Microsoft Authenticator（应用商店搜索即可）
在 github 的 password and authentication 栏目中（就在 payment information 下面），在 Two-factor methods 下选择**Authenticator app**，按照网页要求进行设置即可
![双重验证](https://cloud.tsinghua.edu.cn/f/3d4a25df739b4a66a4fc/?dl=1)

:::warning
这一步会生成账户的恢复代码，注意留存好
:::

## 2.学生认证

:::note
新注册的 github 账号可能会认证失败，稍等几天就好
:::

>认证过程中记得关掉代理，若在校外需挂学校 VPN，github 会通过网络定位你是不是在校内

来到Billing and licensing下的Education benefits
![入口](https://cloud.tsinghua.edu.cn/f/4d1e24f3f312493ebc54/?dl=1)
进入后按指示操作即可
:::note
github会根据学生邮箱自动选择学校
之后会要求选择用什么做证明，选第一项即可，学生证是最好的证明
如果学生证的中文下没有对应的英文，建议自行补充（用便利贴粘一下）
:::

:::warning
拍照不允许使用虚拟摄像机
:::

如果顺利，大概一天就会通过申请

## 3.领取福利
认证通过后回到Billing and licensing下的Education benefits即可领取学生权益
## 4. copilot配置
### 1. github部分
在copilot设置中把能勾的全勾上😏
![copilot设置](https://cloud.tsinghua.edu.cn/f/d16d169140c64ae093e4/?dl=1)
在github上可以使用网页版copilot，和其他ai工具类似：[github.com/copilot](https://github.com/copilot)

### 2. vscode

>只介绍c/c++，python照猫画虎就行

[官网链接](https://code.visualstudio.com/)
![安装时此页建议都勾选](https://cloud.tsinghua.edu.cn/f/c1cdbced69f04efe8899/?dl=1)
下载安装打开后，安装**C/C++**和**Code Runner**插件
![](https://cloud.tsinghua.edu.cn/f/f24218f47ccf4f458ef0/?dl=1)
![](https://cloud.tsinghua.edu.cn/f/b1accf61e57d4245b017/?dl=1)
### 编译环境：g++

各位同学应该都有dev-cpp，其中已经包含了g++编译器

打开Dev-Cpp安装目录下的**MinGW64\bin**文件夹，将路径复制下来
在开始菜单搜索**环境变量**，选择**编辑账户的环境变量**
找到**Path**这个变量，在其中添加刚刚复制的路径
在终端输入g++ -v 有输出即可
配置好之后打开vscode（需重启），再找一个cpp文件点右上角的运行键即可在下方终端运行程序了

### 进阶：clang编译器与clangd扩展

> ref:
> [[万字长文]Visual Studio Code 配置 C/C++ 开发环境的最佳实践(VSCode + Clangd + XMake)](https://zhuanlan.zhihu.com/p/398790625)

微软intellsense的替代品，具有更好的代码补全，比g++更详细的编译报错，调用函数时能显示其参数的原有定义等等功能，能改善开发体验，但只是锦上添花。
![比如我先定义一个deleteNeuron函数](https://cloud.tsinghua.edu.cn/f/062a3e810ca141b594f7/?dl=1)
![之后调用时便会显示出其意义](https://cloud.tsinghua.edu.cn/f/6ac80dad6a014c8598b8/?dl=1)
1. 安装clang编译器
   - [官网链接](https://clang.llvm.org/)
   - 根据系统选择相应的安装方式

2. 安装clangd扩展
   - 在vscode中搜索并安装**clangd**扩展
![](https://cloud.tsinghua.edu.cn/f/ef8b994dd74e42dc8570/?dl=1)

#### 然后是copilot
在扩展中下载**GitHub Copilot**
安装成功后右下角会弹出登录提醒，登录刚刚开通copilot的账号即可
随后即可使用copilot的所有功能啦！
包括**智能代码补全、编辑器内联聊天、右侧聊天栏**、以及**agent mode**