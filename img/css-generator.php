<?php
$list = [];

foreach (scandir('boss') as $file) {
    if (is_file('boss/' . $file)) {
        list($id,) = explode('.', $file);
        $list[] = '.boss_' . $id . ' { background-image: url("http://l902892b.beget.tech/script/img/boss/' . $file . '"); } ';
    }
}

file_put_contents('boss.css', implode("\r\n", $list));