var memoForm = document.getElementById('memo-form');
var memoList = document.getElementById('memo-list');
var searchInput = document.getElementById('search-input');
var tagFilter = document.getElementById('tag-filter');

memoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var eventInput = document.getElementById('event-input').value;
  var dateInput = document.getElementById('date-input').value;
  var timeInput = document.getElementById('time-input').value;
  var addressInput = document.getElementById('address-input').value;
  var tagInput = document.getElementById('tag-input').value;

  if (eventInput.trim() === '' || dateInput.trim() === '' || timeInput.trim() === '' || addressInput.trim() === '' || tagInput.trim() === '') {
    return;
  }

  var memoItem = createMemoItem(eventInput, dateInput, timeInput, addressInput, tagInput);
  memoList.appendChild(memoItem);

  populateTagFilter();
  resetForm();
});

searchInput.addEventListener('input', function() {
  var keyword = searchInput.value.toLowerCase();
  var memos = document.getElementsByClassName('memo-item');

  for (var i = 0; i < memos.length; i++) {
    var memo = memos[i];
    var event = memo.getElementsByClassName('event')[0].textContent.toLowerCase();
    var tag = memo.getElementsByClassName('tag')[0].textContent.toLowerCase();

    if (event.includes(keyword) || tag.includes(keyword)) {
      memo.style.display = 'block';
    } else {
      memo.style.display = 'none';
    }
  }
});

tagFilter.addEventListener('change', function() {
  var selectedTag = tagFilter.value;
  var memos = document.getElementsByClassName('memo-item');

  if (selectedTag === 'all') {
    for (var i = 0; i < memos.length; i++) {
      memos[i].style.display = 'block';
    }
  } else {
    for (var i = 0; i < memos.length; i++) {
      var memo = memos[i];
      var tag = memo.getElementsByClassName('tag')[0].textContent.toLowerCase();

      if (tag === selectedTag) {
        memo.style.display = 'block';
      } else {
        memo.style.display = 'none';
      }
    }
  }
});

function createMemoItem(event, date, time, address, tag) {
  var memoItem = document.createElement('div');
  memoItem.classList.add('memo-item');

  var eventElement = document.createElement('p');
  eventElement.classList.add('event');
  eventElement.textContent = '事件: ' + event;

  var timeElement = document.createElement('p');
  timeElement.classList.add('time');
  timeElement.textContent = '時間: ' + date + ' ' + time;

  var addressElement = document.createElement('p');
  addressElement.classList.add('address');
  addressElement.textContent = '地址: ' + address;

  var tagElement = document.createElement('p');
  tagElement.classList.add('tag');
  tagElement.textContent = '標籤: ' + tag;

  var editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.textContent = '編輯';
  editButton.addEventListener('click', function() {
    editMemoItem(memoItem, event, date, time, address, tag);
  });

  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = '刪除';
  deleteButton.addEventListener('click', function() {
    if (confirm('確定要刪除這個備忘錄嗎？')) {
      memoList.removeChild(memoItem);
      populateTagFilter();
    }
  });

  memoItem.appendChild(eventElement);
  memoItem.appendChild(timeElement);
  memoItem.appendChild(addressElement);
  memoItem.appendChild(tagElement);
  memoItem.appendChild(editButton);
  memoItem.appendChild(deleteButton);

  return memoItem;
}

function editMemoItem(memoItem, event, date, time, address, tag) {
  var eventElement = memoItem.getElementsByClassName('event')[0];
  var timeElement = memoItem.getElementsByClassName('time')[0];
  var addressElement = memoItem.getElementsByClassName('address')[0];
  var tagElement = memoItem.getElementsByClassName('tag')[0];

  var eventInput = prompt('請輸入新的事件', event);
  var dateInput = prompt('請輸入新的日期', date);
  var timeInput = prompt('請輸入新的時間', time);
  var addressInput = prompt('請輸入新的地址', address);
  var tagInput = prompt('請輸入新的標籤', tag);

  if (eventInput !== null && dateInput !== null && timeInput !== null && addressInput !== null && tagInput !== null) {
    eventElement.textContent = '事件: ' + eventInput;
    timeElement.textContent = '時間: ' + dateInput + ' ' + timeInput;
    addressElement.textContent = '地址: ' + addressInput;
    tagElement.textContent = '標籤: ' + tagInput;
  }
}

function populateTagFilter() {
  var tags = [];
  var memos = document.getElementsByClassName('memo-item');

  for (var i = 0; i < memos.length; i++) {
    var memo = memos[i];
    var tag = memo.getElementsByClassName('tag')[0].textContent.toLowerCase();

    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }

  tagFilter.innerHTML = '<option value="all">全部</option>';

  for (var i = 0; i < tags.length; i++) {
    var option = document.createElement('option');
    option.value = tags[i];
    option.textContent = tags[i];
    tagFilter.appendChild(option);
  }
}

function resetForm() {
  memoForm.reset();
}

populateTagFilter();
