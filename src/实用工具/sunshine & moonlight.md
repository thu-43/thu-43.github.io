---
# 这是文章的标题
title: Sunshine & Moonlight
# 你可以自定义封面图片
# 这是页面的图标
icon: laptop
# 这是侧边栏的顺序
order: 3
# 设置作者
cover: "https://cloud.tsinghua.edu.cn/f/d4d9c026d66b400f8e1f/?dl=1"
author: 串子
# 设置写作时间
date: 2025-06-28
# 一个页面可以有多个分类
category:
  - 实用工具
# 一个页面可以有多个标签
tag:
  - 串流
# 此页面会在文章列表置顶
# 此页面会出现在星标文章中
star: true
---
# 差生文具多 第三期

<center>
是什么给了笔者放弃笔记本的自信<br>
隆重介绍

## Sunshine & Moonlight
地表最强串流组合！！
</center>

![](https://cloud.tsinghua.edu.cn/f/194ca4518b6140579f4f/?dl=1)

想要~~几乎~~零成本加块副屏？

![](https://cloud.tsinghua.edu.cn/f/f4cf7b5da2534f0aa1c7/?dl=1)

想要校内随处使用宿舍的电脑？

![](https://cloud.tsinghua.edu.cn/f/b9861639d3c546ed9e4a/?dl=1)

甚至：

![充分利用图书馆资源](https://cloud.tsinghua.edu.cn/f/2872c131f65f4ed6a92b/?dl=1)

想要看舍友突脸？

![眼睛遮住了就不打码了](https://cloud.tsinghua.edu.cn/f/adfe9f75e91540c2b9c7/?dl=1)

还想用上废旧笔记本组个低成本三联屏？

![演示游戏：BeamNG 可惜串流方案不支持nvidia surrdound](https://cloud.tsinghua.edu.cn/f/69dab16c05c04a6b8478/?dl=1)

**这些全都可以用两兄弟干！**  
**延迟极低！**  
实测上海连过来都可以打冰与火之舞（一款音游）  
~~感谢华子的ipv4地址是公网ip~~

注：串流方案对视频编解码性能要求较高，建议使用带独显的电脑配置  
~~轻薄本你就老老实实带着吧~~
 
---
目录：
>1.软件下载汇总
>2.电脑端Sunshine配置
>3.手机/电脑moonlight客户端使用
>4.ddns配置域名(可选)
>5.进阶
### 1. 下载
>Sunshine基地版： [github.com/qiin2333/Sunshine-Foundation/releases](https://github.com/qiin2333/Sunshine-Foundation/releases)
>or:[www.123pan.com/s/26VVVv-UqV6d.html](https://www.123pan.com/s/26VVVv-UqV6d.html)，提取码xuan
>原版Sunshine的功能只有采集显示器并发送到客户端（类似obs），同时接受客户端的操作
>本版本额外集成虚拟显示器、webview，更便于使用<br>

>moonlight阿西西版：[github.com/Axixi2233/moonlight-android/releases](https://github.com/Axixi2233/moonlight-android/releases)
>or:[pan.quark.cn/s/9a334d831290](https://pan.quark.cn/s/9a334d831290)
>原版moonlight不支持手机/平板多点触控输入
>本版本支持多点触控，ui完善<br>

>ddns-go(可选): [github.com/jeessy2/ddns-go/releases](https://github.com/jeessy2/ddns-go/releases)

### 2. Sunshine配置

作者教程：[docs.qq.com/aio/DSGdQc3htbFJjSFdO](https://docs.qq.com/aio/DSGdQc3htbFJjSFdO)
>简要清单
1.安装
2.选择显卡
3.打开UPnP和IPv6
4.配置虚拟显示器

>[!note]
>安装了NOD32杀毒软件的同学需要在防火墙中将Sunshine用到的端口打开
![默认端口](https://cloud.tsinghua.edu.cn/f/4a89c885695944348a7f/?dl=1)

### 3. 手机/电脑moonlight客户端使用
#### 1.设置串流配置
建议全原生，码率设置到30左右
![moonlight设置](https://cloud.tsinghua.edu.cn/f/05bd38c17d234708a57c/?dl=1)
#### 2.添加设备
在电脑上打开终端，输入：
```bash
ipconfig
```
找到电脑的ip地址（一般是59.66.xxx.xx），在moonlight上输入
或者使用ipv6地址，在moonlight上输入时需添加中括号（i.e. [2402:f000:4:1008:809:xxxx:xxxx:xxxx]）
在[usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn)也能查到在线设备的ip地址
电脑上会收到pin码配对的提示，输入即可
#### 3.串流，启动！
进入后打开**desktop**即可享受副屏体验，在**系统设置**中可调节显示器相对位置
>[!warning]
如果出门在外串流，宿舍内的显示器也开着的话，应用可能会开到错误的显示器上，在客户端看不到
这时候可以用**OBS Studio**使用**显示器采集**临时查看另一个显示器的画面（可在**steam**上免费下载）


### 4. ddns搞个域名(可选)
>[!note]
>DDNS，动态域名系统（Dynamic Domain Name System），它是在DNS的基础上发展起来的一种服务，用来解决动态IP地址的问题

>校园网并不提供静态IP地址，而是提供动态IP地址，这就意味着你的IP地址可能经常变动，一旦IP改变，那么DNS服务器解析自然就会失败，这样就没办法通过域名访问到服务器了

>那怎么办呢？DDNS来帮你！在DDNS客户端中配置好域名和IP的映射关系后，它会监控你的IP地址，一旦发现它变化了，就立刻通知DDNS服务器，最后DNS服务器会从DDNS服务器拿到映射关系，所以无论你的IP地址如何变动，通过你的DDNS域名可以随时访问家里的设备

>简单来说，就是在公网上有了一个域名能直接映射到你的ip，
![ddns示意](https://cloud.tsinghua.edu.cn/f/9e9d6dfdb36345b296d9/?dl=1)

>[!note]
>校园网ipv4是公网ip，ipv6默认公网，两种ip均可使用

#### 1.域名免费申请
[dynv6.com](https://dynv6.com/)
>[!note]
>注册时的人机验证需要科学上网

![创建域名](https://cloud.tsinghua.edu.cn/f/c00b8d19048a44468948/?dl=1)
![](https://cloud.tsinghua.edu.cn/f/c81b46c01eba4e1ba58c/?dl=1)
![](https://cloud.tsinghua.edu.cn/f/2d02c42365c241769193/?dl=1)
![记下Domainname和Benutzername<br>一会儿要用](https://cloud.tsinghua.edu.cn/f/433cfbc7ada04a09bb3d/?dl=1)
#### 2.ddns-go
安装后打开[http://localhost:9876/](http://127.0.0.1:9876/)
url输入
http:/dynv6.com/api/update?hostname=#{domain}&token=**你的Benutzername**&ipv6=#{ip}&ipv6prefix=#{ip}
RequestBody输入**你的Domainname**
![](https://cloud.tsinghua.edu.cn/f/ac790dc395e04e17b4de/?dl=1)
Domains输入你的Domainname
![](https://cloud.tsinghua.edu.cn/f/6990bbd84c9b44ca9c96/?dl=1)
ipv4设置类似，保存即可
此时在moonlight中添加设备是直接输入这一域名即可连接
![](https://cloud.tsinghua.edu.cn/f/a2a9ed4bc5de4af78289/?dl=1)
### 5.进阶（简单介绍）
#### 1.远程开机(wake on lan, wol)
>硬件需求：路由器，最好是支持wol且能运行自行准入认证脚本（tunet）的软路由；部分笔记本对wol支持不好，可自行查找资料
自动准入脚本：[github.com/Berrysoft/tunet-rust](https://github.com/Berrysoft/tunet-rust)

在BIOS和Windows下配置好wol相关设置：
![BIOS下，以华硕为例](https://kmpic.asus.com/images/2021/05/21/7492f906-2f58-4e46-b6b9-e967ea660d53.bmp)
![windows网卡设置](https://pic1.zhimg.com/v2-c385c6b2107afd7e04df5582a801b612_1440w.jpg)
此时，把电脑关机，然后在moonlight里选择**发送Wake-On-LAN请求**，电脑应该会开机
然而长时间关机后，校园网会掉准入，此时电脑无法接收客户端发送的wol包
此时我们需要一台长期开机并且不会掉准入的设备（即路由器）接收这个wol信号
但是将电脑连入路由器后，ip地址会变成路由内网的地址
此时可通过**端口映射**或者直接连两根网线解决（一根插路由，一根直连校园网）
#### 2.串流端(安卓)外接显示器
把图书馆显示器的Type-C线插在平板上就行
使用**Sam helper**+**shizuku**（酷安下载）更改平板分辨率以适应显示器分辨率
（安卓平板对外接扩展屏支持不好，似乎只能镜像）

---
## 日月同辉与君行，畅行全校一身轻

下期预告：
WSL:我的Windows里有个Linux
