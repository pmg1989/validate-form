// 链表
function NodeList() {
  this.head = new Node("head"); //该链表的头对象

  this.find = find; //查找节点
  this.findPrev = findPrev; // 查找前一个节点
  this.findLast = findLast; // 查找最后的节点，便于以反序显示链表中元素这类任务
  this.insert = insert; //插入节点
  this.remove = remove; //删除节点
  this.display = display; //展示链表节点

  function Node(element) {
    this.element = element;
    this.previous = null; // 双向链表，单向链表时可移除
    this.next = null;
  }

  function find(item) {
    var curNode = this.head;
    while (curNode.element !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }

  function findPrev(item) {
    var curNode = this.head;
    while (curNode.next !== null && curNode.next.element !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }

  function findLast() {
    var curNode = this.head;
    while (!(curNode.next == null)) {
      curNode = curNode.next;
    }
    return curNode;
  }

  function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current; // 双向链表，单向链表时可移除
    current.next = newNode;
  }

  function display() {
    var curNode = this.head;
    var nodeList = [];
    while (curNode.next !== null) {
      nodeList.push(curNode.next.element);
      curNode = curNode.next;
    }
    return nodeList;
  }

  function remove(item) {
    // 单向链表，双向链表时可移除
    // var prevNode = this.findPrev(item);
    // if (prevNode.next !== null) {
    //   prevNode.next = prevNode.next.next;
    // }

    // 双向链表，单向链表时可移除
    var curNode = this.find(item);
    if (!(curNode.next == null)) {
      curNode.previous.next = curNode.next;
      curNode.next.previous = curNode.previous;
      curNode.next = null;
      curNode.previous = null;
    }
  }
}
