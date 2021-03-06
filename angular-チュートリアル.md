﻿# AngularJSチュートリアル　解説

https://docs.angularjs.org/tutorial


サンプル確認ブラウザはFirefoxを使ってください。
ローカルでの確認の場合はChromeでは正しく表示されません。


## STEP1

AngularJSが標準HTMLをどのように拡張するか試してみます。
STEP1は単純な静的なHTMLページの例です。
STEP2は同じ内容をAngularJSで作成する例です。

まず、静的な HTMLページを作成します。
今回の例では、2つのスマホのリストが追加します。

ファイル名はapp/index.html

```
<ul>
  <li>
    <span>Nexus S</span>
    <p>
      Fast just got faster with Nexus S.
    </p>
  </li>
  <li>
    <span>Motorola XOOM™ with Wi-Fi</span>
    <p>
      The Next, Next Generation tablet.
    </p>
  </li>
</ul>
```


## STEP2

前回作成したシンプルなHTMLコンテンツと同等のものをAngular.jsで記述します。
このSTEP2ではHTMLでビューを作成することと「モジュール」と「コントローラ」を作成することです。

AngularJSアプリケーションでは、モデル、ビュー、コントローラ（MVC）のデザインパターンを使用してコードを分離しています。
これを念頭に置いて、今後の作業はAngularJSとJavaScriptを使用して、モデル、ビュー、コントローラを追加していく作業を行ないます。


* まずはAngularJSをCDNで読み込みます。またscriptタグのsrc属性で作成したapp.jsを読み込みます。

```
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="app.js"></script>
```

### ビューとテンプレート

Step2の段階では直接HTMLにビューを作成します。

app/index.html

```
<!doctype html>
<html ng-app="phonecatApp">
<head>
  <meta charset="utf-8">
  <title>Google Phone Gallery</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
  <script src="app.js"></script>
</head>
<body ng-controller="PhoneListController">

  <ul>
    <li ng-repeat="phone in phones">
      <span>{{phone.name}}</span>
      <p>{{phone.snippet}}</p>
    </li>
  </ul>

</body>
</html>
```

ビューとして使われるHTMLとプログラムを記述するコントローラー部分を関連付けているのは、Angular.jsでのインターポレーションです。また、$scopeがvewとcontrollerをバインドしてくれています。
さらに、注目すべき点として、ハードコーディングされたスマホリストをngRepeat属性と2つの AngularJS式（{{ }}のこと）に置き換えたことです。


### インターポレーション

インターポレーションとは、補完や補充することです。文字列を変数などのプレースホルダーを使って作ることをいいます。
例えば、JavaScriptでは文字列と変数を ＋ でつなぐことができます。このことをインターポレーションといいます。

簡単なJavaScriptのインターポレーションの例

```
 var name = 'Tahara';
'私は' + name + 'です。';
// 私はTaharaです。
```

Angular.jsでのインターポレーションは$scopeがvewとcontrollerをバインドしてくれます。

HTML側とインターポレートするにはAngularJS式{{}}を使います。
{{}}の中身とコントローラーの中身は $scope が橋渡します。

簡単な参考例（これはSTEP2のサンプルではありません）
コントロール側の記述

```
myApp.controller('mainController',['$scope',function($scope) {
	$scope.name = 'Tahara';
}]);
```

HTML側の記述

```
<p>私は{{name}}です。</p>
```

{{}}の中身は $scope の中となりますので、{{$scope.name}}と記述しないので注意してください。

また、ページ読み込みの際、「<p>私は{{name}}です。</p>」部分はそのままダウンロードされてきてDOM構築されています。そして、レンダリング時点でインターポレートさせています。

STEP2でのAngular式は次の部分です。

```
{{phone.name}}{{phone.snippet}}
```


### HTMLのカスタム属性について

HTML5から用意されたカスタム属性はHTMLに独自の属性を作成することができます。HTMLの表示上では何も起こりませんが、スクリプト上（DOM操作）では認識できているものです。

AngularJSはカスタム属性を活用しているのでカスタム属性について理解しておくことが重要です。

### リピートの仕組み

AngularJSのカスタム属性「ng-repeat属性」はliのように別々の内容を繰り返し表示するときに便利です。
記述は以下の通りです。

ng-repeat="phone in phones"

この属性をliに指定するとphonesの配列化されたデータが展開された状態で複数のliに収まります。
phonesはオブジェクト（連想配列）の状態でデータが格納されています。ということはどこかでこのオブジェクトを作成しないといけないことになります。


### モジュール

モジュールとはアプリを構成するためのコンポーネント部品の入れ物です。

例えば、クッキーを作る製造ライン専用の部屋をイメージしてみましょう。モジュールというクッキー専用の部屋を作ることで、大規模な工場になったとしても、クッキーを作る型とチョコレートを作る型の名前がどちらも「型」で名前が重なっていますが実際は全く別のものだった場合にミスを犯すことがなくなるのです。
 
AngularJSを使う場合、まずモジュール作成を行います。
これは別ファイルにしたapp/app.jsに記述します。
 
AngularJSのモジュール作成はmoduleメソッドを使用します。

[記述方法]
angular.module('モジュール名', 依存するモジュール[配列]) 
 
重要：依存するモジュールが無くても空の配列を記述することが重要なポイントです。
  
例
```
 var phonecatApp = angular.module('phonecatApp', []);
```

STEP2で記述したmoduleの特徴はvar phonecatApp変数に代入していることです。STEP2ではcontroller()の記述が同じファイル内で行われています。このような場合は一旦変数にモジュールを代入してからそのモジュールを使用する方法が便利です。けれどもcontroller()を別ファイルにした場合やその他のファイルから呼び出して使う場合は決して良い方法ではありません。それは通常プログラム開発をする場合、グローバル変数は一つでも減らしたいからです。
その場合グローバル変数に代入する代わりに次のような手法を取ります。

```
angular.module('phonecatApp', []);
angular.module('phonecatApp')
.controller('コントローラー名',function($scope){...});
```

controllerメソッドの前にangular.module('phonecatApp')をつけます。
ここで注意する点は第2引数を記述しないことです。第2引数の[]を記述すると新規にモジュールを作成することになり上書きされてしまいますので注意が必要です。
このチュートリアルでもSTEP3以降はこの記述方法に変わります。

作成したモジュールとHTMLを関連付けるには、カスタム属性を使います。このことを AngularJSでは「ng-appディレクティブ」と呼びます。
例

```
 ng-app="phonecatApp"
``` 

ディレクティブは「指令」「命令」と言った意味がありますが、あるDOM要素を操るために記述する命令だとイメージしておくと分かりやすいです。


### コントローラー

コントローラは、コンストラクタ関数の引数に $scope パラメータ使う単純な仕組みです。
データモデル（オブジェクトリテラル表記のスマホの単純な配列）は、PhoneListController コントローラ内でインスタンス化しています。

#### コントローラーの記述方法

* 第1引数はコントローラーの名前
* 第2引数は関数でコントローラーの実態  
例
モジュール名.controller('コントローラ名',function(){
    処理内容
});


#### STEP2のコントローラ記述

```
phonecatApp.controller('PhoneListController', function PhoneListController($scope) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});
```

ng-controllerを使うとコントローラーとHTMLを関連づけることができます。

```
<body ng-controller="PhoneListController">
```

コントローラは、データモデルのコンテキストを提供することで、モデルとビューの間のデータバインディングを確立することができます。

PhoneListControllerコントローラは、スマホのデータを添付し $scope でコントローラ機能に注入しました。このスコープは、アプリケーションの定義時に作成されたルートスコープのプロトタイプの子孫です。このコントローラーの有効範囲は、<body ng-controller="PhoneListController">
で指定された範囲となります。つまり body 全部です。


### Dependency Injection(依存性の注入　省略してdi）

Dependency Injectionとはfunctionにオブジェクトを渡すことです。
オブジェクトをfunctionの中で生成するのでは無く、functionにオブジェクトを引数として渡すことで依存性を無くします。

例
```
var Person = function (firstName,lastName){
	this.firstName = firstName;
	this.lastName = lastName;
}

function logPerson(){
	var tarou = new Person('Tarou','Yamada');
	console.log(tarou);
}

logPerson();
```

この場合logPerson()はPerson('Tarou','Yamada')に依存しています。
これはあまり使い勝手がよくありません。

従って以下のように記述します。

```
function logPerson(person){	
	console.log(person);
}

var tarou = new Person('Tarou','Yamada');
logPerson(tarou);
```

これが依存性の注入になります。


### Scopeサービス

Scope は vew と model を繋げてくれる存在です。
Scope は Scope サービスから作られるオブジェクトです。
使い方として、$scope オブジェクトを使用します。
$マークは angular が用意したオブジェクトを識別しやすくしたものです。
$scope を依存性の注入を使って渡しています。

AngularJSのスコープの概念は非常に重要です。スコープは、テンプレート、モデル、およびコントローラーを連携させるための接着剤と見ることができます。AngularJSは、テンプレート、データモデル、コントローラに含まれている情報とともにスコープを使用して、モデルとビューを別々の状態に保ちます。
また特徴的なこととして、スコープは同期します。モデルに加えられた変更はすべてビューに反映されます。そして、ビュー内で発生した変更はモデルに反映されます。

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope) {
	$scope.name = 'Yamada';
	$scope.hobby = 'fissing';
	$scope.getName = function(){
		return 'Yamada';
	}
	console.log($scope.getName());
    console.log($scope);
});
```

引数の読み込み

```
var search = function(firstName,height,age,hobby){
	return 'Yamada';
}
console.log(search(1,2,3,4));
console.log(angular.injector().annotate(search));
```

その他のサービス
* $log
* $http

例
```
myApp.controller('mainController', function($scope,$log,$filter) {
	$scope.name = 'tarou';
	$scope.formattedName = $filter('uppercase')($scope.name);
	$log.info($scope.name);
	$log.info($scope.formattedName);
});
```

## STEP3 コンポーネント


### コンポーネントについて

テンプレート（バインディングとプレゼンテーションロジックを含むビューの一部）は、我々のデータを整理し、ユーザに表示するための青写真として機能します。

この組み合わせ（テンプレート+コントローラ）は一般的なパターンであるため、AngularJSはコンポーネントを再利用可能な独立したエンティティ（コンポーネントとも呼ばれます）に組み合わせる簡単で簡潔な方法を提供します。さらに、AngularJSは、コンポーネントの各インスタンスに対していわゆる隔離スコープを作成します。つまり、プロトタイプの継承がなく、コンポーネントがアプリケーションの他の部分に影響を及ぼす危険性がなくなります。

コンポーネントを作成するには、AngularJSモジュールの.component（）メソッド を使用します。コンポーネント名とコンポーネント定義オブジェクトを提供する必要があります。

コンポーネントはディレクティブでもあるので、コンポーネントの名前はcamelCase （たとえばmyAwesomeComponent）で指定します。そして、HTMLで参照するときには、ダッシュ区切りにします。先ほどの例では、my-awesome-component となります。

最も単純な形式では、コンポーネント定義オブジェクトにテンプレートとコントローラが含まれています。（実際にはコントローラーを省略することができ、AngularJSはダミーコントローラーを作成します。これは、テンプレートに何も振る舞わない単純な "プレゼンテーション"コンポーネントに便利です）。


### コンポーネントの記述方法

コンポーネントはJavaScriptコードにangular.Module.component()メソッドで記述します。
第1引数はコンポーネント名の文字列で、第2引数にオブジェクトでオプションを定義します。
component(コンポーネントの名前, ディレクティブ定義オブジェクト)

HTML側にはコンポーネント名をダッシュ表示に変えたタグ（HTMLにはないAngularだけが認識できるタグ）を記述すれば、好きな場所に表示が可能となります。


### STEP3コンポーネントの使用サンプルコード

HTMLコード

```
<!doctype html>
<html lang="en" ng-app="phonecatApp">
  <head>
    <meta charset="utf-8">
    <title>Google Phone Gallery</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="app.js"></script>
    <script src="phone-list.component.js"></script>
  </head>
  <body>

    <!-- Use a custom component to render a list of phones -->
    <phone-list></phone-list>

  </body>
</html>
```


app/app.js
```
'use strict';

// Define the `phonecatApp` module
angular.module('phonecatApp', []);
```


app/phone-list.component.js
```
'use strict';

/* Register `phoneList` component, along with its associated controller and template */
angular.
  module('phonecatApp').
  component('phoneList', {
    template:
        '<ul>' +
          '<li ng-repeat="phone in $ctrl.phones">' +
            '<span>{{phone.name}}</span>' +
            '<p>{{phone.snippet}}</p>' +
          '</li>' +
        '</ul>',
    controller: function PhoneListController() {
      this.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    }
  });
```

以上の記述で、今回作成したサンプルの再利用が可能となりました。
<phone-list></phone-list> タグをページのどこにでも記述するだけで、携帯スマホのリストを取得できます。HTML上ではよりクリーンな宣言方法となり、それを見るだけで携帯スマホのリストがあることがわかります。
コンポーネントは「外部の影響」から隔離され、安全です。同様に、アプリケーションの他の部分で誤って何かを壊す可能性があるので、心配する必要はありません。私たちのコンポーネントの内部で何が起こるかは、私たちのコンポーネントの内部にとどまります。
また、コンポーネントを単独でテストする方法が簡単になります。



## STEP4 ディレクトリとファイルの構成

このSTEPから表示の確認はFirefoxを使ってください。あるいは、何らかのサーバーを経由して確認する必要があります。
ローカル環境のChromeでは表示されません。
これはテンプレートを読み込む際の、同一生成元ポリシーというセキュリティ上の制約のために、指定されたプロトコル以外でファイルを読み込むことができない」という制限のためです。サーバー上に置いてローチンした時は問題が起こりません。

今回のサンプルをより簡単に拡張可能かつ保守可能にするために、一歩前進し、コードベースをリファクタリングし、ファイルとコードを変更します。

* 各エンティティを独自のファイルに入れます。
* 関数ではなく、機能領域別にコードを整理します。
* コードを他のモジュールが依存できるモジュールに分割します。


### ファイルの整理

私たちはファイルを機能別にディレクトリに分けてグループ化します。たとえば、アプリケーションにスマホの一覧を表示するセクションがあるので、関連するすべてのファイルを 下のディレクトリに配置します。

ディレクトリの構造
app/
  phone-list/
    phone-list.component.js
    phone-list.component.spec.js
  app.js

各機能/セクションは、独自のモジュールを宣言し、関連するすべてのエンティティをそこに登録します。メインモジュール（phonecatApp）は、各機能/セクションモジュールに依存関係を宣言します。新しいプロジェクトで同じコードを再利用するには、フィーチャーディレクトリをコピーし、フィーチャーモジュールを新しいプロジェクトのメインモジュールに依存して追加します。

phoneList今回の変更により、私たちの機能は次のようになります：

app/
  phone-list/
    phone-list.module.js
    phone-list.component.js
    phone-list.component.spec.js
  app.module.js
  

### モジュールの使用

モジュラーアーキテクチャーの利点の1つは、同じアプリケーション内だけでなくアプリケーション間でのコードの再利用です。このコードを摩擦なしで再利用するための最後のステップが1つあります。

各フィーチャ/セクションは独自のモジュールを宣言し、関連するすべてのエンティティはそのモジュールに登録する必要があります。
このphoneList機能を例に挙げてみましょう。これまで、phoneListコンポーネントはphonecatAppモジュール上に自身を登録していました。
```
angular.
  module('phonecatApp').
  component('phoneList', ...);
```

同様に、付随するspecファイルは、phonecatApp各テストの前にモジュールをロードします（コンポーネントが登録されているためです）。さて、私たちが取り組んでいる別のプロジェクトにスマホのリストが必要だと想像してください。私たちのモジュラーアーキテクチャのおかげで、私たちは車輪を再構築する必要はありません。他のプロジェクトのphone-list/ディレクトリをコピーし、index.htmlファイルに必要なスクリプトタグを追加するだけです。

新しいプロジェクトはphonecatAppモジュールについて何も知らない。したがって、すべての参照をphonecatAppこのプロジェクトのメインモジュールの名前に置き換える必要があります。容易に想像することができるように、これは面倒でエラーが起こりやすいことです。

各機能/セクションは、独自のモジュールを宣言し、関連するすべてのエンティティをそこに登録します。メインモジュール（phonecatApp）は、各機能/セクションモジュールに依存関係を宣言します。新しいプロジェクトで同じコードを再利用するには、フィーチャーディレクトリをコピーし、フィーチャーモジュールを新しいプロジェクトのメインモジュールに依存として追加するだけです。

phoneListは今回の変更により、私たちの機能は次のようになります。

/：
```
app/
  phone-list/
    phone-list.module.js
    phone-list.component.js
    phone-list.component.spec.js
  app.module.js
```

app/phone-list/phone-list.module.js：
```
// Define the `phoneList` module
angular.module('phoneList', []);
```

app/phone-list/phone-list.component.js：
```
// Register the `phoneList` component on the `phoneList` module,
angular.
  module('phoneList').
  component('phoneList', {...});
```

app/app.module.js：
（以降、今だけメインモジュールの宣言が含まれている、我々はそれを与えたサフィックスを）app/app.js.module
```
// Define the `phonecatApp` module
angular.module('phonecatApp', [
  // ...which depends on the `phoneList` module
  'phoneList'
]);
```

モジュールをphoneList定義するときに依存関係配列を渡すことでphonecatApp、AngularJSは登録されているすべてのエンティティをphoneList利用可能にphonecatAppします。

モジュールを定義するファイル（すなわち、コンポーネント.module.js）は、そのモジュールにフィーチャー（コンポーネント、コントローラー、サービス、フィルターなど）を追加する他のファイルよりも前に含まれる必要があることに注意してください。 



### 外部テンプレート

私たちがリファクタリングをしているのでもう一度やりましょう。わかったように、コンポーネントにはテンプレートがあります。テンプレートは基本的にHTMLコードの断片で、データがどのようにレイアウトされてユーザーに提示されるかを指示します。でステップ3、我々は我々が使用して文字列としてコンポーネントのテンプレートを指定することができる方法を説明しましたtemplateCDO（コンポーネント定義オブジェクト）のプロパティを。文字列にHTMLコードを入れることは、特に大きなテンプレートの場合は理想的ではありません。HTMLコードを.htmlファイルに入れることができれば、はるかに良いでしょう。このようにして、私たちはIDE /エディタが提供しなければならないすべてのサポート（HTML特有の色の強調表示や自動補完など）を行い、コンポーネント定義をよりクリーンに保ちます。

したがって、（templateCDO のプロパティを使用して）コンポーネントテンプレートをインラインに保つことは問題ありませんが、コンポーネント用に外部テンプレートを使用しphoneListます。外部テンプレートを使用していることを示すために、templateUrlプロパティを使用し、テンプレートをロードするURLを指定します。テンプレートは、コンポーネントが定義されている場所の近くに保持したいので、内部に配置します。app/phone-list/

templateプロパティ（HTMLコード）app/phone-list/phone-list.template.htmlの内容を次のようにコピーし、CDOを変更しました。


app/phone-list/phone-list.component.js
```
angular.
module('phoneList').
component('phoneList', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'phone-list/phone-list.template.html',
  controller: ...
});
```
実行時に、AngularJSがphoneListコンポーネントのインスタンスを作成する必要がある場合、それはapp/phone-list/phone-list.template.htmlテンプレートを取得するためのHTTPリクエストを行います。

私たちの慣習に沿って、外部テンプレートに接尾辞を使用します。別の一般的な慣習は、単に拡張子（例えば）を持つことです。 .template.htmlphone-list.html
このような外部テンプレートを使用すると、サーバーへのHTTP要求が増えます（外部テンプレートごとに1つ）。AngularJSは不要なリクエスト（テンプレートの遅延読み込み、結果のキャッシングなど）を行わないよう注意しますが、追加のリクエストにはコストがかかります（特にモバイルデバイスやデータプラン接続の場合）。

幸いにも、余分なコストを回避する方法があります（テンプレートを外部に保ちながら）。対象の詳細な議論は、このチュートリアルの範囲外ですが、見てとることができ$ templateRequestと $ templateCache AngularJSは、外部のテンプレートを管理する方法に関する詳しい情報は、サービスを。


### 最終的なディレクトリ/ファイルレイアウト

すべてのリファクタリングが行われた後、これはアプリケーションが外部から見える方法です。

/：
```
app/
  phone-list/
    phone-list.component.js
    phone-list.component.spec.js
    phone-list.module.js
    phone-list.template.html
  app.css
  app.module.js
  index.html
```

## STEP5 リピータのフィルタリング

アプリに検索ボックスを追加します。ユーザーが検索ボックスに入力した内容に応じて、ページのスマートフォンの機種が変更されます。

### コンポーネントテンプレートの変更

app/phone-list/phone-list.template.html
```
<div class="container-fluid">
  <div class="row">
    <div class="col-md-2">
      <!--Sidebar content-->

      Search: <input ng-model="$ctrl.query" />

    </div>
    <div class="col-md-10">
      <!--Body content-->

      <ul class="phones">
        <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query">
          <span>{{phone.name}}</span>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>

    </div>
  </div>
</div>
```
phone-list.templateのHTMLに <input>タグを追加し、AngularJSのフィルタ関数を使用してngRepeatディレクティブの入力を処理しました。

ngModelディレクティブによって、ユーザーは検索条件を入力し、検索結果がスマホリストに表示されるようになります。

この新しいコードは、次のことを示しています。
データ結合：これはAngularJSの中核機能の1つです。ページがロードされると、AngularJSは入力ボックスの値を、指定されたデータモデル変数にバインドしngModel、2つを同期させて保持します。

このサンプルコードでは、ユーザーが入力ボックスに入力する（バインドされた$ctrl.query）データは、リストリピータ（phone in $ctrl.phones | filter:$ctrl.query）のフィルタ入力としてすぐに使用できます。データモデルを変更するとリピータの入力が変更されると、リピータは効率的にDOMを更新してモデルの現在の状態を反映します。

filterフィルターの使用：フィルター関数は 値を使用して、照会と一致するレコードのみを含む新しい配列を作成します。

ngRepeatfilterフィルタによって返されるスマホ番号の変更に応じてビューが自動的に更新されます。プロセスは開発者にとって完全に透過的です。


## STEP6 双方向データバインディング

このステップでは、ユーザーがスマホリスト内のアイテムの並べ順を制御できるようにする機能を追加します。
動的な並べ順変更は、新しいモデルプロパティを作成し、それをリピータと一緒に配線し、データバインディングマジックが残りの作業を行うようにすることで実装されます。

次の記述で検索ボックスに加えて、アプリケーションにはドロップダウンメニューが表示され、ユーザーはスマホのリストの順序を制御できます。

### コンポーネント　テンプレート

テンプレートに対して以下の変更を加えます。
app/phone-list/phone-list.template.html
```
<div class="container-fluid">
  <div class="row">
    <div class="col-md-2">
      <!--Sidebar content-->

      <p>
        Search:
        <input ng-model="$ctrl.query">
      </p>

      <p>
        Sort by:
        <select ng-model="$ctrl.orderProp">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>

    </div>
    <div class="col-md-10">
      <!--Body content-->

      <ul class="phones">
        <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp">
          <span>{{phone.name}}</span>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>

    </div>
  </div>
</div>
```

最初に、<select>バインドされた要素を追加しました。ユーザーは2つの提供された並べ替えオプションから選択できます。

次にfilter、orderByフィルタを使用してフィルタをチェーンし、リピータの入力をさらに処理しました。orderBy入力配列を受け取り、それをコピーし、そのコピーを並べ替えた後に返すフィルタです。

AngularJSは、select要素とモデルの間に双方向データバインディングを作成します。 

データバインディングとリピータに関するセクションで説明したように、モデルが変更されると（たとえば、ユーザーが選択ドロップダウンメニューを使用して注文を変更するなど）、AngularJSのデータバインディングによってビューが自動的に更新されます。膨大なDOM操作コードは必要ありません！

### コンポーネントコントローラ

app/phone-list/phone-list.component.js
```
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: function PhoneListController() {
      this.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.',
          age: 1
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.',
          age: 2
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.',
          age: 3
        }
      ];

      this.orderProp = 'age';
    }
  });
```

phonesスマホの配列であるモデルを修正し、age各スマホレコードにプロパティを追加しました。このプロパティは、スマホをage順に並べ替えるために使用されます。

デフォルト値をorderProptoに設定する行をコントローラに追加しました。ここでデフォルト値を設定しなかった場合、ユーザーがドロップダウンメニューからオプションを選択するまで、フィルタは初期化されません。

これは、双方向のデータバインディングについて話す良い時期です。アプリケーションがブラウザにロードされると、ドロップダウンメニューで「最新」が選択されていることに注意してください。これはコントローラに設定orderPropさ 'age'れているためです。したがって、バインディングはモデルからUIへの方向に作用します。ドロップダウンメニューで「アルファベット順」を選択すると、モデルも更新され、スマホの並べ替えが行われます。これは、UIからモデルへの逆方向の仕事をしているデータバインディングです。


## STEP7 XHR($httpサービス)と依存性注入

ハードコーディングされたデータセットに3つのスマホを搭載したアプリを構築するには十分です。$httpという AngularJSの組み込みサービスの1つを使用して、サーバーから大きなデータセットを取得しましょう。AngularJSの依存性注入（DI）を使用して、コンポーネントのコントローラにサービスを提供します。

現在、サーバからロードされた20台のスマホのリストがあります。

### DATA

app/phones/phones.json

```
[
  {
    "age": 13,
    "id": "motorola-defy-with-motoblur",
    "name": "Motorola DEFY\u2122 with MOTOBLUR\u2122",
    "snippet": "Are you ready for everything life throws your way?"
    ...
  },
  ...
]
```

### コンポーネントコントローラ

私たちは、app/phones/phones.jsonファイル内のデータを取得するために私たちのWebサーバーへのHTTPリクエストを作成するために、コントローラでAngularJSの$httpサービスを使用します。$httpはWebアプリケーションで一般的な操作を処理する組み込みのAngularJSサービスの1つです。AngularJSは、必要な場所で、これらのサービスをあなたのために注入します。

サービスはAngularJSのDIサブシステムによって管理されます。依存関係注入は、Webアプリケーションを適切な構造（プレゼンテーション、データ、制御などの独立したエンティティ）と疎結合（エンティティ間の依存関係はエンティティ自身ではなくDIサブシステムによって解決されます）にするのに役立ちます。その結果、アプリケーションのテストも容易になります。

app/phone-list/phone-list.component.js
```
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: function PhoneListController($http) {
      var self = this;
      self.orderProp = 'age';

      $http.get('phones/phones.json').then(function(response) {
        self.phones = response.data;
      });
    }
  });
```

$httpは私たちのWebサーバーに対してHTTP GETリクエストを行い、phones.jsonを探します（URLはindex.htmlファイルがある場所を基準にします）。サーバーは、JSONファイル内のデータを提供することによって応答します。（応答はバックエンドサーバーによって動的に生成されたものでもよく、ブラウザーとアプリケーションにはどちらも同じように見えます。簡単にするために、このチュートリアルではJSONファイルを使用します）。

この$httpサービスは、then()メソッドを持つpromiseオブジェクトを返します。このメソッドは、非同期レスポンスを処理し、スマホデータをコントローラに割り当てるためにphonesが呼び出されます。AngularJSがJSONレスポンスを検出し、コールバックに渡されたresponseオブジェクトのdataプロパティにそれを解析したことに注目してください。

この値が定義されていないコールバック関数にphonesプロパティを代入するので、コントローラインスタンスを指すselfというローカル変数も導入します。
これは、then()の中で関数を定義していますが、ここでthisを使用しても、PhoneListController()コンストラクターのthisとは違うものになります。
そこで一旦PhoneListController()コンストラクターのthisをself変数に代入して置いてそれを使う方法を取っています。
ただし、これはアロー関数で書けばthisをそのまま使えます。


### promiseについて

promiseはAngularJSの標準サービスでも使うことができます。
promiseはES2015で登場した非同期処理の完了または失敗を表現するクラスです。promiseという言葉が示すように、非同期処理が完了すると次の処理を呼び出すことを約束（promise）するというものです。
JavaScriptで非同期処理を行うには通常はコールバック関数を利用します。けれども、これはコールバック地獄を生み出す原因ともなります。コールバックを使用せずにpromiseを使用することでスマートな記述をすることができるようになります。
よく使うpromiseには次のメソッドがあります。
Promise(preocess) コンストラクター
Promise.prototype.then(onfullfild,onrejected) インスタンスメソッド
Promise.prototype.catch(onrejected) インスタンスメソッド
Promise.all(iterable) スターティックメソッド
引数の関数が実行されたら次のthenが実行される。
Promise.race(iterable) スターティックメソッド
引数の関数が実行されたら、早く終了した方が次のthenが実行される。

#### Promise コンストラクター

構文
new Promise(process)
引数 processの実態は非同期で実行したい処理をする関数
正常終了するとresolveを実行し、失敗した場合はrejectを実行する。
resolve,rejectは通常関数となります。
process :function(resolve,reject){}

#### Promise.prototype.then()

resolveが呼ばれたらonfullfild
valueはresolveの引数
 onfullfild : function(value){}
rejectが呼ばれたらonrejected
reasonはrejectの引数
 onrejected : function(reason){}
 戻り値　Promise

#### Promise.prototype.catch() 

エラーがあった時に呼び出される。
Promise.prototype.catch(onrejected)
引数 onrejected : function(reason){}
戻り値　Promise


#### 非同期処理とコールバック関数の例


＊知っておきたいJavaScriptの基本

JavaScriptは基本的にシングルスレッドで動いています。
これはつまり、JavaScriptは並行処理はできないということです。
同期であろうと非同期であろうと2つ以上の処理を同時に行なうことはできません。
JavaScriptでは、キューに登録された関数が順番にひとつずつ実行されていきます。

そしてJavaScriptのもうひとつの特徴として、JavaScriptは非同期処理できることです。
非同期処理とは、例えばデータベースに仕事を任せている間に自分の他の仕事を進めることができることです。

同期処理の例
```
console.log(1);
console.log(2);
console.log(3);
```
結果は1 2 3の順番で表示されます。
コンソールログの値が上から順番に実行されて表示されました。

非同期処理の例
```
console.log(1);
setTimeout(function(){console.log(2)}, 1000);
console.log(3);
```
結果は1 3 2の順番に表示されます。
console.log(1)の実行後、次にconsole.log(2)がタイマーに登録され、console.log(3)が実行されます。これは同期処理ですが、タイマーがカウントする間をconsole.log(3)は待たずに実行されます。この処理が非同期処理になります。

console.log(2)の処理では、関数setTimeoutに無名関数function(){console.log(2)}を渡しています。このように、ある関数Aの引数に別の関数Bを渡し、AからBを呼び出すことをコールバックといいます。


### コールバック地獄の例

```
console.log(1);
setTimeout(function(){console.log(2);
setTimeout(function(){console.log(3);}, 1000)}, 1000);
```




### promiseを活用した例







AngularJSでサービスを使用するには、必要な依存関係の名前を次のようにコントローラのコンストラクタ関数の引数として宣言するだけです。

```
function PhoneListController($http) {...}
```

AngularJSの依存性インジェクタは、コントローラの構築時に、コントローラにサービスを提供します。また、依存インジェクタは、サービスが持つ可能性のある推移的な依存関係を作成します（サービスは他のサービスに依存することが多い）。

引数の名前は、インジェクタがこれらを使用して依存関係をルックアップするため重要であることに注意してください。

### $-prefix命名規則

あなたは独自のサービスを作成することができます。実際には、これからもいくつかのステップを実行します。命名規則として、AngularJSの組み込みサービス、Scopeメソッド、および他のいくつかのAngularJS API $では、名前の前に接頭辞が付きます 。

$プレフィックスはAngularJSが提供するサービスを名前空間にあります。衝突を避けるためには、サービスの名前を付けたり、$で始めます。

スコープを調べると、いくつかのプロパティは$$で始まるものもあります。これらのプロパティはプライベートとみなされるため、アクセスまたは変更しないでください。


### minification

minification:ファイルを圧縮してダウンロードを高速化
圧縮サービスサイト
https://javascript-minifier.com/

例えば次のコントローラーをminify化したらどうなるか
 myApp.controller('mainController', function($scope,$log,$filter) {
 	$log.info($scope);
 });

このようになりエラーになります。
 myApp.controller("mainController",function(n,o,l){o.info(n)});


そこで配列を使って次のように記述します。
myApp.controller('mainController',['$scope','$log','$filter',function($scope,$log,$filter) {
$log.info($scope);
}]);
これならminify 化してもエラーになりません。
myApp.controller("mainController",["$scope","$log","$filter",function(o,l,n){l.info(o)}]);

AngularJSは第2引数の配列の文字列部分を引数と見ています。その次にくるfunctionの引数はどのようなものであっても最初の文字列が引数として当てられます。

### 細分化に関する注釈

AngularJSは、コントローラのコンストラクタ関数への引数の名前から、コントローラの依存関係を推論しています。あなたが縮小化のためのJavaScriptコードをminified化した場合、PhoneListControllerコントローラの引数のすべてが同様に縮小されることになります。この場合、依存性注入を識別することができなくなり、不具合が出てしまいます。

この問題は、文字列として提供されている依存関係の名前を関数に注釈を付けることで解決できます。これらのinjection annotationsを提供するには、2つの方法があります。

$inject文字列の配列を保持するコントローラ関数のプロパティを作成します。配列内の各文字列は、対応するパラメータに挿入するサービスの名前です。この例では、次のように記述します。

function PhoneListController($http) {...}
PhoneListController.$inject = ['$http'];
...
.component('phoneList', {..., controller: PhoneListController});
インラインアノテーションを使用すると、関数を提供するだけでなく、配列を提供することができます。この配列には、サービス名のリストが含まれ、その後に関数自体が配列の最後の項目として含まれます。
```
function PhoneListController($http) {...}
...
.component('phoneList', {..., controller: ['$http', PhoneListController]});
```
これらの方法は両方とも、AngularJSによって注入可能な関数で動作しますので、どちらを使用するかはプロジェクトのスタイルガイドによって決まります。

2番目の方法を使用する場合は、コントローラーを登録するときにコンストラクター関数をインラインで提供するのが一般的です。
```
.component('phoneList', {..., controller: ['$http', function PhoneListController($http) {...}]});
```
このステップ以降、チュートリアルではインラインメソッドを使用します。

app/phone-list/phone-list.component.js
```
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['$http',
      function PhoneListController($http) {
        var self = this;
        self.orderProp = 'age';

        $http.get('phones/phones.json').then(function(response) {
          self.phones = response.data;
        });
      }
    ]
  });
```


## STEP8 テンプレートリンクと画像

このステップでは、スマホリストのスマホのサムネイル画像を追加します。
また、リンク要素を使用して、カタログ内のスマホに関する追加情報を表示します。


### データ

「phones.jsonファイル」には、各スマホの固有のIDとイメージのURLが含まれています。（下記コード）
また、URLは「app/img/phones/ディレクトリ」を指します。

app/phones/phones.json
```
[
  {
    ...
    "id": "motorola-defy-with-motoblur",
    "imageUrl": "img/phones/motorola-defy-with-motoblur.0.jpg",
    "name": "Motorola DEFY\u2122 with MOTOBLUR\u2122",
    ...
  },
  ...
]
```


### コンポーネントテンプレート

app/phone-list/phone-list.template.html
```
...
<ul class="phones">
  <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp" class="thumbnail">
    <a href="#/phones/{{phone.id}}" class="thumb">
      <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />
    </a>
    <a href="#/phones/{{phone.id}}">{{phone.name}}</a>
    <p>{{phone.snippet}}</p>
  </li>
</ul>
...
```

### リンクの設定

将来的にスマホの詳細ページにつながるリンクを動的に生成するために、href属性値にはAngularJS式の二重中括弧を使用しました。
STEP2では、要素コンテンツとして{{phone.name}}バインディングを追加しました。このSTEPでは、要素の属性でバインディング{{phone.id}}が使用されます。
つまり，AngularJS式の二重中括弧を使ったバインディングは要素の中身としても使えるし、属性の値としても使えます。

### 画像の表示

また、「ngSrcディレクティブ」付きのimageタグを使用して、各レコードの隣にスマホイメージを追加しました。

＊＊動的に画像表示するにはsrc属性は使わずに、「ngSrcディレクティブ」を使用します。
このディレクティブは、ブラウザがAngularJS {{ expression }} マークアップを文字通り扱うことを防ぎ、通常のsrc属性（<img src="{{phone.imageUrl}}">）で属性バインディングのみを指定した場合、無効なURL（http://localhost:8000/{{phone.imageUrl}}）へのリクエストを開始して’壊れた画像を表示したり、意図しない画像を表示することになります。このngSrcディレクティブを使用することで、ブラウザは無効な場所へのHTTPリクエストを行いません。

実はリンクの設定も同様の問題が起こります。この場合は「ng-hrefディレクティブ」を使用することで防ぐことができます。


## STEP9 ルーティングと複数のビュー

このステップでは、ngRouteというAngularJSモジュールを使用して、レイアウトテンプレートを作成する方法と、ルーティングを追加して複数のビューを持つアプリケーションを構築する方法を学習します。

まずは今まで通り、ブラウザにスマホのリストが表示されます。
次に、スマホのリンクをクリックすると、URLが特定のスマホに変わり、スマホの詳細ページが表示されるというものです。

このステップで追加されたルーティング機能ngRouteは、AngularJSフレームワークとは別に配布されるモジュール内のAngularJSによって提供されます。そのため別途現在使用しているAngularJSのバージョン1.6.xと互換性のある"angular-route"モジュールバージョンをリンクさせる必要があります。

### 複数のビュー、ルーティングおよびレイアウトテンプレート

現在作成中のアプリはスマホ一覧ページですが、それぞれのスマホの詳細を表示するページを作成します。

詳細ビューを追加するために、我々は"レイアウトテンプレート"と呼ばれるものに目を向けます。
これは、アプリケーションのすべてのビューで共通のテンプレートです。現在、ユーザに表示されている現在の「ルート」に応じて、他の「部分テンプレート」がこのレイアウトテンプレートに含まれます。

AngularJSのアプリケーションルートは、$routeProviderを介して宣言されます。
これは、$routeサービスのプロバイダです。このサービスにより、コントローラ、ビューテンプレート、およびブラウザの現在のURLの場所を簡単に結びつけることができます。この機能を使用して、ディープリンクを実装することができます。これにより、ブラウザの履歴（前後のナビゲーション）とブックマークも通常どおり利用することができます。


### テンプレート

$routeサービスは通常、ngView ディレクティブとともに使用されます。ngViewディレクティブの役割は、現在のルートのビューテンプレートをレイアウトテンプレートに含めることです。
例えば、下記例のように <div ng-view></div> のような記述をします。

app/index.html
```
<!doctype html>
<html lang="en" ng-app="phonecatApp">
  <head>
    <meta charset="utf-8">
    <title>Google Phone Gallery</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="angular-route.min.js"></script>
    <script src="app.module.js"></script>
    <script src="app.config.js"></script>
    <script src="phone-list/phone-list.module.js"></script>
    <script src="phone-list/phone-list.component.js"></script>
    <script src="phone-detail/phone-detail.module.js"></script>
  <script src="phone-detail/phone-detail.component.js"></script>
  </head>
  <body>

    <!-- Use a custom component to render a list of phones -->
     <div ng-view></div>
  </body>
</html>
```

追加のJavaScriptファイルをアプリケーションに読み込むためscript 、ファイルに4つの新しいタグを追加しました。

angular-route.js：ngRouteルーティングを提供するAngularJS モジュールを定義します。
app.config.js：プロバイダをメインモジュールで使用できるように設定します。
phone-detail.module.js：phoneDetailコンポーネントを含む新しいモジュールを定義します。
phone-detail.component.js：ダミーphoneDetailコンポーネントを定義します。
テンプレート<phone-list></phone-list>から行を削除し、 <div ng-view></div>と置き換えたことに注意してください。


### モジュールの設定

モジュールの.config（）メソッドは、利用可能なプロバイダのコンフィグレーションにアクセスできるようにします。ngRoute アプリケーションに利用可能なプロバイダ、サービス、およびディレクティブを定義ngRouteするには、phonecatAppモジュールの依存関係として追加する必要があります。

app/app.module.js
```
angular.module('phonecatApp', [
  'ngRoute',
  ...
]);
```
現在、コアサービスとディレクティブに加えて、$route（プロバイダを使用して）アプリケーションをアプリケーションにコンフィグレーションすることもできます。構成コードをすばやく見つけることができるように、別のファイルに置き、接尾辞を使用しました。

app/app.config.js
```
angular.
  module('phonecatApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);
```

.config()メソッドを使用して、必要なプロバイダ（たとえば、$routeProvider）をconfigメソッドの引数に注入し、そのメソッドを使用して対応するサービスの動作を指定します。

ルーティングを定義するために $routeProvider.when（）および $routeProvider.otherwise（）メソッドを使用します。

今回のチュートリアルのルーティングは以下のように定義されています。

when('/phones')：URLハッシュフラグメントが/phonesと表示されているときに表示されるビューを決定します。指定されたテンプレートに従って、AngularJSは ビューを管理するコンポーネントのphoneListインスタンスを作成します。これは、以前はindex.htmlファイルで使用していたのと同じページが開かれます。

when('/phones/:phoneId')：は、URLのハッシュフラグメントが/phones/<phoneId>と一致した場合、表示されるビューを決定するのは、<phoneId>URLの可変部分です。ビューを担当するphoneDetailコンポーネントになります。

otherwise('/phones')：リダイレクト先のフォールバックルートを定義します。ルート定義が現在のURLと一致しない場合はリダイレクト先にリダイレクトされます（/phonesにリダイレクトされます）。

私たちphoneListはすでに構築したphoneDetail コンポーネントと新しい「ダミー」コンポーネントを再利用しました。今のところ、phoneDetailコンポーネントは選択したスマホのIDを表示します。（それほど印象的ではありませんが、次のステップでそれを強化します）。



### ルーティングの仕組みについて


ルーティングとは、リクエストURLに応じて処理の受け渡しをするものです。

ルーティングの仕組みはAngularJSではngRouteモジュールとして提供。
コアモジュールとは別になっていますので別途インポートしておく必要があります。
HTML側でルーティングの仕組みを使うには、ng-view属性を使用します。これを使用することでルーティングで呼び出されたテンプレートが表示されます。

ルーティングの定義
ルーティングの定義は$routeProviderプロバイダーの設定はモジュールの定義でconfig()メソッドを使います。
config()メソッドで、when/otherwiseメソッドを利用してルーティングします。

whenメソッド
when(URLパターン,route情報)
otherwise(route情報)

例
/　をMainControllerコントローラー／main.htmlで処理
/articles/ をArticleControllerコントローラー／article.htmlで処理

```
angular.module('myApp')
.controller('MainController',['$scope',function($scope){
$scope.msg='Hello!';
}])
.controller('ArticleController',['$scope',$routeParams){
$scope.id=$routeParams.keyword;
}])
```



### phoneDetailコンポーネント

phoneDetailというスマホの詳細ビューを処理するコンポーネントを作成しました。phoneList別のディレクトリを使用してphoneDetailモジュールを作成し、phonecatAppモジュールの依存関係として追加したのと同じ規則を採用しました。

app/phone-detail/phone-detail.module.js
```
angular.module('phoneDetail', [
  'ngRoute'
]);
```
app/phone-detail/phone-detail.component.js
```
angular.
  module('phoneDetail').
  component('phoneDetail', {
    template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$routeParams',
      function PhoneDetailController($routeParams) {
        this.phoneId = $routeParams.phoneId;
      }
    ]
  });
```

app/app.module.js
```
angular.module('phonecatApp', [
  ...
  'phoneDetail',
  ...
]);
```

### サブモジュールの依存関係に関する注意事項

phoneDetailモジュールに依存ngRoute提供するためのモジュール$routeParamsで使用されているオブジェクト、phoneDetailコンポーネントのコントローラ。ngRouteまた、メインphonecatAppモジュールの依存関係でもあるため、そのサービスとディレクティブはアプリケーション（phoneDetailコンポーネントを含む）のどこでも利用可能です。

つまりngRoute、phoneDetailコンポーネントの依存関係のリストに含まれていなくても、アプリケーションは引き続き動作します。メインモジュールによって既にインポートされているサブモジュールの依存関係を省略することは魅力的かもしれませんが、Googleが得意とするモジュール性が損なわれます。

常にサブモジュールの依存関係を明示してください。親モジュールから継承した依存関係に依存しないでください（その親モジュールはある日存在しない可能性があるため）。


## STEP10 その他のテンプレート

このSTEPでは、ユーザーがスマホリスト内のスマホをクリックしたときに表示されるスマホの詳細ビューを実装します。

リストのスマホをクリックすると、スマホ固有の情報を含むスマホの詳細ページが表示されます。
スマホ詳細ビューを実装するために、$httpを使用してデータを取得し、phoneDetailコンポーネントのテンプレートを完成させます。

### データ

app/phones/ディレクトリには各スマホ用のJSONファイルもphones.jsonに含まれています。

app/phones/nexus-s.json
```
{
  "additionalFeatures": "Contour Display, Near Field Communications (NFC), ...",
  "android": {
    "os": "Android 2.3",
    "ui": "Android"
  },
  ...
  "images": [
    "img/phones/nexus-s.0.jpg",
    "img/phones/nexus-s.1.jpg",
    "img/phones/nexus-s.2.jpg",
    "img/phones/nexus-s.3.jpg"
  ],
  "storage": {
    "flash": "16384MB",
    "ram": "512MB"
  }
}
```
これらのファイルのそれぞれは、同じデータ構造のスマホのさまざまなプロパティを記述します。このデータはスマホの詳細ビューに表示されます。

### コンポーネントコントローラ

このサービスをphoneDetail使用してコンポーネントのコントローラを拡張し$http、適切なJSONファイルを取得します。これは、phoneListコンポーネントのコントローラと同じ方法で動作します。
app/phone-detail/phone-detail.component.js
```
angular.
  module('phoneDetail').
  component('phoneDetail', {
    templateUrl: 'phone-detail/phone-detail.template.html',
    controller: ['$http', '$routeParams',
      function PhoneDetailController($http, $routeParams) {
        var self = this;

        $http.get('phones/' + $routeParams.phoneId + '.json').then(function(response) {
          self.phone = response.data;
        });
      }
    ]
  });
```

### コンポーネントテンプレート

インラインのTBDプレースホルダテンプレートは、携帯スマホの詳細を構成するリストやバインディングを含む完全な外出テンプレートに置き換えられました。AngularJS マークアップの使用方法と、モデルからのスマホデータをビューに投影する方法に注目してください 。

app/phone-detail/phone-detail.template.html
```
<img ng-src="{{$ctrl.phone.images[0]}}" class="phone" />

<h1>{{$ctrl.phone.name}}</h1>

<p>{{$ctrl.phone.description}}</p>

<ul class="phone-thumbs">
  <li ng-repeat="img in $ctrl.phone.images">
    <img ng-src="{{img}}" />
  </li>
</ul>

<ul class="specs">
  <li>
    <span>Availability and Networks</span>
    <dl>
      <dt>Availability</dt>
      <dd ng-repeat="availability in $ctrl.phone.availability">{{availability}}</dd>
    </dl>
  </li>
  ...
  <li>
    <span>Additional Features</span>
    <dd>{{$ctrl.phone.additionalFeatures}}</dd>
  </li>
</ul>
```


## STEP11 カスタムフィルタ

このSTEPでは、独自のカスタム表示フィルタを作成する方法を学習します。

前のステップで、詳細ページに「true」または「false」のいずれかが表示され、特定のスマホ機能が存在するかどうかが示されました。このステップでは、カスタムフィルタを使用して、これらのテキスト文字列をグリフに変換しています。「true」は（\u2713 -> ✓）、「false」は(\u2718 -> ✘)。

### The checkmarkFilter

このフィルタは一般的なものです（つまり、ビューやコンポーネントに固有のものではありません）。これを「アプリケーション全体」の機能を含むcoreモジュールに登録します。

app/core/core.module.js
```
angular.module('core', []);
```

app/core/checkmark/checkmark.filter.js
```
angular.
  module('core').
  filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  });
```

フィルタの名前は「チェックマーク」です。The inputは、trueまたはfalseのいずれかに評価され、true（\u2713->✓）およびfalse（\u2718->✘）を表すために選択した2つのUnicode文字のいずれかを返します。

フィルタが準備完了したので、coreメインphonecatAppモジュールの依存関係としてモジュール を登録する必要があります。

app/app.module.js
```
angular.module('phonecatApp', [
  ...
  'core',
  ...
]);
```

### テンプレート 

我々は2つの新しいファイル（作成しているのでcore.module.js、checkmark.filter.jsを）、私たちはレイアウトテンプレートでそれらを含める必要があります。

app/index.html
```
...
<script src="core/core.module.js"></script>
<script src="core/checkmark/checkmark.filter.js"></script>
...
```

app/phone-detail/phone-detail.template.html
```
...
<dl>
  <dt>Infrared</dt>
  <dd>{{$ctrl.phone.connectivity.infrared | checkmark}}</dd>
  <dt>GPS</dt>
  <dd>{{$ctrl.phone.connectivity.gps | checkmark}}</dd>
</dl>
...
```


## STEP12 イベントハンドラ

このステップでは、スマホの詳細ページにクリック可能なスマホ画像swapperを追加します。

スマホの詳細ビューには、現在のスマホの1つの大きな画像といくつかの小さなサムネイル画像が表示されます。目的のサムネイル画像をクリックするだけでサムネイルのいずれかを大​​きな画像に置き換えることが目的です。AngularJSでこれを行う方法を見てみましょう。

### コンポーネントコントローラ

app/phone-detail/phone-detail.component.js

```
...
controller: ['$http', '$routeParams',
  function PhoneDetailController($http, $routeParams) {
    var self = this;

    self.setImage = function setImage(imageUrl) {
      self.mainImageUrl = imageUrl;
    };

    $http.get('phones/' + $routeParams.phoneId + '.json').then(function(response) {
      self.phone = response.data;
      self.setImage(self.phone.images[0]);
    });
  }
]
...
```
phoneDetail、コンポーネントのコントローラ、作成したmainImageUrlモデルプロパティと、最初のスマホの画像URLにデフォルト値を設定します。

また、（イベントハンドラとして使用する）メソッドを作成し、その値を変更します。

### コンポーネントテンプレート

app/phone-detail/phone-detail.template.html
```
<img ng-src="{{$ctrl.mainImageUrl}}" class="phone" />
...
<ul class="phone-thumbs">
  <li ng-repeat="img in $ctrl.phone.images">
    <img ng-src="{{img}}" ng-click="$ctrl.setImage(img)" />
  </li>
</ul>
...
```
ngSrcは大きなイメージの指示をプロパティに結びつけました。

ngClickハンドラをサムネイル画像とともに登録しました。ユーザーがサムネイル画像の1つをクリックすると、ハンドラはメソッドのコールバックを使用して、プロパティの値をクリックされたサムネイル画像のURLに変更します。


## STEP13 RESTとカスタムサービス

このステップでは、アプリケーションがデータをフェッチする方法を変更します。

RESTfulなクライアントを表すカスタムサービスを定義します。このクライアントを使用して、より低いレベルの$http API、HTTPメソッド、およびURL を処理することなく、サーバーへのデータ要求を簡単に行うことができます。

### 依存関係

RESTfulな機能は、AngularJSフレームワークとは別に配布されるngResourceモジュールのAngularJSによって提供されます。

新しい依存関係は、AngularJSのバージョン1.6.xと互換性のある角度リソースモジュールのバージョンをダウンロードして読み込む必要があります。

### サービス


私たちは、サーバー上のスマホデータへのアクセスを提供する独自のサービスを作成します。サービスを独自のモジュールに置きcore、依存関係を明示的に宣言することができます。ngResource

app/core/phone/phone.module.js：
```
angular.module('core.phone', ['ngResource']);
```
app/core/phone/phone.service.js：
```
angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('phones/:phoneId.json', {}, {
        query: {
          method: 'GET',
          params: {phoneId: 'phones'},
          isArray: true
        }
      });
    }
  ]);
```
ファクトリ関数を使用してカスタムAPIを登録するために、モジュールAPIを使用しました。我々はサービス名'Phone'と factory関数を渡した。 factory関数は、コントローラのコンストラクタに似ていますが、両方とも関数の引数を介して挿入される依存関係を宣言できます。Phoneサービスは、上の依存関係を宣言$resource によって提供されるサービス、ngResourceモジュールを。

$リソースサービスは、それが簡単に作成できるRESTfulな わずか数行のコードをクライアントに。このクライアントは、下位の$httpサービスではなく、アプリケーションで使用できます。

app/core/core.module.js
```
angular.module('core', ['core.phone']);
```
モジュールをモジュールの依存関係として追加する必要があります。

### テンプレート

私たちのカスタムリソースサービスが定義されるので、このファイルと関連するファイルをレイアウトテンプレートに含める必要があります。さらに、モジュールを含むファイルもロードする必要があります.

app/index.html
```
<head>
  ...
  <script src="bower_components/angular-resource/angular-resource.js"></script>
  ...
  <script src="core/phone/phone.module.js"></script>
  <script src="core/phone/phone.service.js"></script>
  ...
</head>
```

### コンポーネントコントローラ

下位レベルのサービスを除外して新しいサービスに置き換えることで、コンポーネントコントローラ（PhoneListControllerおよびPhoneDetailController）を簡素化できるようになりました。AngularJSの サービスは、RESTfulなリソースとして公開されているデータソースと対話する場合よりも使いやすいです。コントローラ内のコードが何をしているのかを理解することも簡単になりました。

app/phone-list/phone-list.module.js
```
angular.module('phoneList', ['core.phone']);
```

app/phone-list/phone-list.component.js
```
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone',
      function PhoneListController(Phone) {
        this.phones = Phone.query();
        this.orderProp = 'age';
      }
    ]
  });
```

app/phone-detail/phone-detail.module.js
```
angular.module('phoneDetail', [
  'ngRoute',
  'core.phone'
]);
```

app/phone-detail/phone-detail.component.js
```
angular.
  module('phoneDetail').
  component('phoneDetail', {
    templateUrl: 'phone-detail/phone-detail.template.html',
    controller: ['$routeParams', 'Phone',
      function PhoneDetailController($routeParams, Phone) {
        var self = this;
        self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
          self.setImage(phone.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });
```

PhoneListController私たちがどのように置き換えられたのか注目する

$http.get('phones/phones.json').then(function(response) {
  self.phones = response.data;
});
ちょうどと：

this.phones = Phone.query();
これは単純で宣言的なステートメントで、すべてのスマホに対してクエリを実行します。

上記のコードで重要なことは、Phoneサービスのメソッドを呼び出すときに、コールバック関数を渡さないことです。結果が同期的に返されたかのように見えますが、そうではありません。同期して返されるのは、XHR応答を受け取ったときにデータで埋められる「未来」です。AngularJSのデータバインディングのために、私たちはこの未来を利用してテンプレートにバインドすることができます。次に、データが到着すると、ビューは自動的に更新されます。

時には、将来のオブジェクトとデータバインディングのみに依存するだけでは、必要なすべてを行うには不十分な場合があります。そのため、これらのケースでは、サーバーレスポンスを処理するコールバックが必要になります。

## STEP14 アニメーション

このステップでは、前に作成したテンプレートコードの上にCSSアニメーションとJavaScriptアニメーションを追加して、Webアプリケーションを強化します。

ngAnimateモジュールを使用して、アプリケーション全体でアニメーションを有効にします。
また、組み込みディレクティブを使用して、アニメーションのフックを自動的にトリガーしてタップします。
アニメーションが見つかると、指定された時間に要素に対して発行されている実際のDOM操作（ngRepeatのノードの挿入/削除、ngClassのクラスの追加/削除など）とともに実行されます。

### 依存関係

アニメーション機能は、ngAnimateモジュール内のAngularJSによって提供されます。これは、AngularJSコアフレームワークとは別に配布されます。さらに、このプロジェクトではjQueryを使用して余分なJavaScriptアニメーションを作成します。


### アニメーションとの連携 ngAnimate

テンプレート
アニメーションを有効にするには、必要な依存関係（angular-animate.jsおよびjquery.js）と、CSS / JavaScriptアニメーションで使用されるCSSおよびJavaScriptコードを含むファイルを更新して更新する必要があります。アニメーションモジュールngAnimateには、アプリケーションをアニメーションに対応させるために必要なコードが含まれています。
app/index.html
```
...

<!-- Defines CSS necessary for animations -->
<link rel="stylesheet" href="app.animations.css" />

...

<!-- Used for JavaScript animations (include this before angular.js) -->
<script src="bower_components/jquery/dist/jquery.js"></script>

...

<!-- Adds animation support in AngularJS -->
<script src="bower_components/angular-animate/angular-animate.js"></script>

<!-- Defines JavaScript animations -->
<script src="app.animations.js"></script>

...
```

### 依存関係

ngAnimate最初にメインモジュールに依存関係を追加する必要があります。
app/app.module.js
```
angular.
  module('phonecatApp', [
    'ngAnimate',
    ...
  ]);
```

### CSSトランジションアニメーション：アニメーション ngRepeat

まずngRepeat、phoneListコンポーネントのテンプレートにある指示 文にCSSトランジションアニメーションを追加します。CSSアニメーションコードでフックできるように、繰り返し要素に余分なCSSクラスを追加する必要があります。

app/phone-list/phone-list.template.html
```
...
<ul class="phones">
  <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp"
      class="thumbnail phone-list-item">
    <a href="#!/phones/{{phone.id}}" class="thumb">
      <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />
    </a>
    <a href="#!/phones/{{phone.id}}">{{phone.name}}</a>
    <p>{{phone.snippet}}</p>
  </li>
</ul>
...
```
あなたは追加されたcssの「phone-list-itemクラス」に気付いたのですか？これはアニメーションを機能させるためにHTMLコードで必要なものです。

実際のCSSトランジションアニメーションコードは次のようになります。
app/app.animations.css
```
.phone-list-item.ng-enter,
.phone-list-item.ng-leave,
.phone-list-item.ng-move {
  transition: 0.5s linear all;
}

.phone-list-item.ng-enter,
.phone-list-item.ng-move {
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.phone-list-item.ng-enter.ng-enter-active,
.phone-list-item.ng-move.ng-move-active {
  height: 120px;
  opacity: 1;
}

.phone-list-item.ng-leave {
  opacity: 1;
  overflow: hidden;
}

.phone-list-item.ng-leave.ng-leave-active {
  height: 0;
  opacity: 0;
  padding-bottom: 0;
  padding-top: 0;
}
```
ご覧のように、CSSの「phone-list-itemクラス」は、アイテムがリストに挿入されたり、リストから削除されたりするときに発生するアニメーションフックと組み合わされます。

新しいスマホがリストに追加され、ページ上でレンダリングされるときに、ng-enterクラスを要素に適用されます。
ng-moveクラスは、リスト内のスマホの相対位置が変更されたときに要素に適用されます。
ng-leaveクラスは、スマホがリストから削除された要素に適用されます。
スマホリストアイテムは、ngRepeatディレクティブに渡されたデータに基づいて追加および削除されます。たとえば、フィルタデータが変更された場合、アイテムはリピートリストの内外でアニメートされます。

注目すべき重要な点は、アニメーションが発生すると、CSSクラスの2つのセットが要素に追加されることです。

アニメーションの先頭のスタイルを表す「開始」クラス。
アニメーションの最後のスタイルを表す「アクティブ」クラス。
開始クラスの名前は、（moveまたはleave、enterのように）プレフィックスng-付きで発生するenterイベントの名前です。だから、イベントが追加になりますng-enterクラスを。

アクティブなクラス名は、開始クラスから-active接尾辞を付けて派生します。この2クラスのCSS命名規則により、開発者はアニメーションを完成させることができます。

上記の例では、アニメーション要素はリストに追加されたときに0pxから120pxの高さに展開され、リストから削除される前に0pxに戻されます。同時に起こるキャッチーなフェードイン/フェードアウトエフェクトもあります。このすべては、CSSファイルの先頭のCSSトランジション宣言によって処理されます。

### CSSキーフレームアニメーション：アニメーション ngView

次に、ngViewのルート変更間のトランジションのアニメーションを追加しましょう 。

ここでも、 要素に新しいCSSクラスを追加することで、HTMLテンプレートを準備する必要があります。私たちのアニメーションの "表現力"を高めるために、要素をコンテナ要素にラップします。

app/index.html
```
<div class="view-container">
  <div ng-view class="view-frame"></div>
</div>
```
.view-containerラッパーにCSSスタイルposition: relativeを適用したので、アニメーション中に.view-frame要素の位置を管理する方が簡単です。

準備コードを用意して、このトランジションアニメーションの実際のCSSスタイルに移りましょう。

app/app.animations.css
```
...

.view-container {
  position: relative;
}

.view-frame.ng-enter,
.view-frame.ng-leave {
  background: white;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.view-frame.ng-enter {
  animation: 1s fade-in;
  z-index: 100;
}

.view-frame.ng-leave {
  animation: 1s fade-out;
  z-index: 99;
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

```

ページ間の単純なフェードイン/フェードアウトエフェクトです。ここで普通のことは、離脱ページ（ng-enterクラスによって識別される）の上に入力ページ（ng-leaveクラスによって識別される）を配置するために絶対配置を使用していることです。同時に、クロスフェードアニメーションが実行されます。したがって、前のページが削除されようとしているので、新しいページがその上に右に消えていく間に消えてしまいます。

一度leaveアニメーションが終わって、要素をDOMから削除されます。同様に、enter アニメーションが完了すると、ng-enterとng-enter-activeCSSクラスが要素から削除され、デフォルトのCSSスタイルで再レンダリングおよび再配置が行われます（アニメーションが終了しても絶対位置は決まりません）。これは流動的に働き、ページはルート変更の間に自然に流れ、何も飛び跳ねることはありません。

適用されたCSSクラスはwithとほぼ同じngRepeatです。新しいページが読み込まれるたびに、 ngViewディレクティブは自身のコピーを作成し、テンプレートをダウンロードして内容を追加します。これにより、すべてのビューが単一のHTML要素内に含まれるようになり、簡単なアニメーション制御が可能になります。

### ngClassJavaScriptを使用したアニメーション

アプリケーションに別のアニメーションを追加しましょう。私たちの見解では、素晴らしいサムネイルスワッパがあります。ページに表示されているサムネイルをクリックすると、プロファイルのスマホイメージが変更されます。しかし、どのようにアニメーションを組み込むことができますか？phone-detail.template.html

最初に考えてみましょう。基本的には、ユーザーがサムネイル画像をクリックすると、プロファイル画像の状態が変更され、新しく選択されたサムネイル画像が反映されます。HTML内の状態変更を指定する最も良い方法は、クラスを使用することです。従来のように、CSSクラスを使用してアニメーションを駆動する場合、今回はCSSクラス自体が変更されたときにアニメーションが発生します。

スマホのサムネイルが選択されるたびに、状態が変わり、.selectedCSSクラスが一致するプロファイルイメージに追加されます。これによりアニメーションがトリガーされます。

のHTMLコードを調整することから始めます。大きな画像を表示する方法を変更したことに注目してください。phone-detail.template.html

app/phone-detail/phone-detail.template.html
```
<div class="phone-images">
  <img ng-src="{{img}}" class="phone"
      ng-class="{selected: img === $ctrl.mainImageUrl}"
      ng-repeat="img in $ctrl.phone.images" />
</div>

...
```
サムネイルの場合と同様に、すべてのプロファイル画像をリストとして表示するためにリピーターを使用していますが、リピート関連のトランジションはアニメートしていません。代わりに、各要素のクラス、特にクラスに注目しselectedていきます。存在または不在は、要素が表示されているか隠されているかを判断するためです。selectedクラスの追加/削除は、指定された条件（）に基づいてngClassディレクティブによって管理されます。私たちの場合、常にそのクラスを持つ要素が1つしかないので、画面に常に1つのスマホプロファイル画像が表示されます。img === $ctrl.mainImageUrlselected

ときにselectedクラスが要素に追加され、そして クラスは、アニメーションをオフに解雇するAngularJSを知らせるために直前に追加されます。場合 クラスが要素から除去され、そしてクラスが別のアニメーションをトリガー、素子に印加されます。selected-addselected-add-activeselectedselected-removeselected-remove-active

最後に、ページが最初に読み込まれたときにスマホの画像が正しく表示されるように、詳細ページのCSSスタイルを微調整します。

app/app.css
```
...

.phone {
  background-color: white;
  display: none;
  float: left;
  height: 400px;
  margin-bottom: 2em;
  margin-right: 3em;
  padding: 2em;
  width: 400px;
}

.phone:first-child {
  display: block;
}

.phone-images {
  background-color: white;
  float: left;
  height: 450px;
  overflow: hidden;
  position: relative;
  width: 450px;
}

...
```
別のCSSベースのアニメーションを作成するつもりだと思っているかもしれません。これを行うことはできますが、.animation（）モジュールメソッドを使ってJavaScriptベースのアニメーションを作成する方法を学ぶ機会を得ましょう 。

app/app.animations.js
```
angular.
  module('phonecatApp').
  animation('.phone', function phoneAnimationFactory() {
    return {
      addClass: animateIn,
      removeClass: animateOut
    };

    function animateIn(element, className, done) {
      if (className !== 'selected') return;

      element.
        css({
          display: 'block',
          position: 'absolute',
          top: 500,
          left: 0
        }).
        animate({
          top: 0
        }, done);

      return function animateInEnd(wasCanceled) {
        if (wasCanceled) element.stop();
      };
    }

    function animateOut(element, className, done) {
      if (className !== 'selected') return;

      element.
        css({
          position: 'absolute',
          top: 0,
          left: 0
        }).
        animate({
          top: -500
        }, done);

      return function animateOutEnd(wasCanceled) {
        if (wasCanceled) element.stop();
      };
    }
  });
```

CSSクラスセレクタ（ここ）とアニメーションファクトリ関数（ここ）を使ってターゲット要素を指定することで、カスタムアニメーションを作成しています 。ファクトリ関数は、特定のイベント（オブジェクトキー）をアニメーションコールバック（オブジェクト値）に関連付けるオブジェクトを返します。イベントはアクションDOMに対応するような認識とにフックすることができ、/ / 、/ /をと。関連するコールバックは、適切な時に呼び出されます。.phonephoneAnimationFactory()ngAnimateaddClassremoveClasssetClassentermoveleaveanimatengAnimate

アニメーションファクトリの詳細については、APIリファレンスを参照してください 。

この場合、要素に追加/削除されるクラスに関心があります。そのため、およびイベントのコールバックを指定します。場合クラスは（VIA要素に追加された命令）、JavaScriptのコールバックを用いて実行される パラメータとして渡されます。渡された最後のパラメータはコールバック関数です。我々は呼んでAngularJSが私たちのカスタムJavaScriptのアニメーションが終了したことを知らせるために。 コールバックは同じように動作しますが、代わりにクラスが削除されたときに実行されます。.phoneaddClassremoveClassselectedngClassaddClasselementdonedone()removeClass

アニメーションの実装にはjQueryのヘルパーを使用しています。jQueryはAngularJSでJavaScriptアニメーションを行う必要はありませんが、例を単純にするためにここに使用しています。詳細は、 jQueryのドキュメントを参照してください。animate()jQuery.animate()

イベントコールバック内で、DOMを操作してアニメーションを作成します。上のコードでは、とを使用してこれを実現しています。結果として、新しい要素は500pxのオフセットで配置され、両方の要素（前と新しい要素）は、それぞれを500pxずらして一緒にアニメーション化されます。結果はコンベヤベルトのようなアニメーションです。関数がアニメーションを完了した後、AngularJSに通知するよう呼び出されます。element.css()element.animate()animate()done

各アニメーションコールバックが関数を返すことに気づいたかもしれません。これはオプションの 関数で、アニメーションが終了したとき、完了したとき、またはキャンセルされたときに呼び出されます（たとえば、別のアニメーションが同じ要素で発生した場合など）。ブール型のパラメータ（wasCanceled）が関数に渡され、アニメーションがキャンセルされたかどうかを開発者に知らせる。必要なクリーンアップを行うには、この機能を使用します。




